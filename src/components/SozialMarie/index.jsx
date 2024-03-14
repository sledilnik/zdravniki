import useTimer from 'hooks/useTimer';
import { Alert, Box, Divider, Snackbar, Stack } from '@mui/material';
import { useLocalStorage } from 'hooks';
import { useEffect, useState, useCallback } from 'react';
import { t } from 'i18next';
import VotingButton from './VotingButton';
import AlertCountDown from './AlertCountDown';
import SozialMarieLink from './SozialMarieLink';
import AlertFooterContent from './AlertFooterContent';
import AlertContentHeader from './AlertHeaderContent';
import { startDate, endDate } from './date-range';

const SOZIAL_MARIE_LINK = 'https://www.sozialmarie.org/sl';

const SozialMarie = function SozialMarie() {
  const currentDate = new Date();
  const countDownDate = currentDate < startDate ? startDate : endDate;
  const isVoting = currentDate >= startDate && currentDate < endDate;
  const isBefore = currentDate < startDate;
  const isAfter = currentDate >= endDate;
  const roundedInitialTime = Math.floor((countDownDate - currentDate) / 1000) * 1000;
  const [timeLeft, setTimeLeft] = useTimer(roundedInitialTime);

  const [show, updateShow] = useLocalStorage('showSozialMarie', 'first');
  const isShow = show !== 'no-show' || !isAfter;
  const [open, setOpen] = useState(isShow);
  const [noShowChecked, setNoShowChecked] = useState(!isShow);

  const [votingExpired, setVotingExpired] = useState(false);

  const sozialMarieTranslations = t('sozialMarie', { returnObjects: true });

  useEffect(() => {
    if (isVoting) {
      setTimeLeft(Math.floor((endDate - new Date()) / 1000) * 1000);
    }
  }, [isVoting, timeLeft, setTimeLeft]);

  useEffect(() => {
    let timeoutId;
    if (isAfter) {
      timeoutId = setTimeout(() => {
        const hasItem = !!localStorage.getItem('showSozialMarie');
        if (hasItem) {
          localStorage.removeItem('showSozialMarie');
        }
        setOpen(false);
      }, 5000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isAfter]);

  useEffect(() => {
    let timeoutId;
    if (isAfter) {
      timeoutId = setTimeout(() => {
        setVotingExpired(true);
      }, 6000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isAfter]);

  const handleClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChecked = useCallback(
    e => {
      updateShow(e.target.checked ? 'no-show' : 'show');
      setNoShowChecked(e.target.checked);
    },
    [updateShow],
  );

  if (votingExpired) {
    return null;
  }

  return (
    <Stack fontSize="0.875rem" marginLeft="auto">
      <VotingButton
        date={countDownDate}
        handleClick={handleClick}
        isBeforeVoting={isBefore}
        isVoting={isVoting}
        isAfterVoting={isAfter}
        time={timeLeft}
      />

      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        open={open}
        onClose={handleClose}
      >
        <Alert
          severity="info"
          variant="outlined"
          onClose={handleClose}
          sx={{ backgroundColor: '#f4f8f8' }}
          component="section"
        >
          <Box component="header" textAlign="center">
            <AlertContentHeader endDate={endDate} startDate={startDate} />
          </Box>
          <Divider />
          <Box component="p">
            {sozialMarieTranslations.votingFor}
            {isBefore ? ` ${sozialMarieTranslations.start}` : null}
            {isVoting ? ` ${sozialMarieTranslations.end}` : null}:
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            paddingBlock="0.5em"
            fontSize="1.5rem"
            color={isVoting ? '#81b130' : '#dc3545'}
          >
            {isAfter ? (
              `${sozialMarieTranslations.votingHasEnded}!`
            ) : (
              <AlertCountDown date={countDownDate} time={timeLeft} />
            )}
          </Box>
          {isAfter ? null : (
            <>
              <SozialMarieLink href={SOZIAL_MARIE_LINK} />
              <Divider />
              <Box component="footer">
                <AlertFooterContent checked={noShowChecked} handleChecked={handleChecked} />
              </Box>
            </>
          )}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SozialMarie;
