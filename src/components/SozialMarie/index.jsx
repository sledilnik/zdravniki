import useTimer from 'hooks/useTimer';
import { getTimeDifference } from 'utils';
import { Alert, Box, Snackbar, Stack, Typography } from '@mui/material';
import { useLocalStorage } from 'hooks';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import VotingButton from './VotingButton';
import { getDevVotingDateRange } from './getDevVotingDateRange';
import AlertCountDown from './AlertCounDown';
import SozialMarieLink from './SozialMarieLink';
import AlertFooterContent from './AlertFooterContent';

const VOTING_STARTS = '2024-04-09 GMT+0200';
const VOTING_ENDS = '2024-04-16 23:59:59:999 GMT+0200';
const SOZIAL_MARIE_LINK = 'https://www.sozialmarie.org/sl';

const now = new Date();
const [startDate, endDate] =
  process.env.NODE_ENV === 'development'
    ? getDevVotingDateRange(now, 5000, 5000)
    : [new Date(VOTING_STARTS), new Date(VOTING_ENDS)];

const SozialMarie = function SozialMarie() {
  const currentDate = new Date();
  const countDownDate = new Date() < startDate ? startDate : endDate;
  const isVoting = currentDate >= startDate && currentDate <= endDate;
  const isBefore = currentDate < startDate;
  const isAfter = currentDate > endDate;
  const [initialTimeLeft, setInitialTimeLeft] = useState(countDownDate - currentDate);
  const timeLeft = useTimer(initialTimeLeft);
  const { days, hours, minutes, seconds } = getTimeDifference(timeLeft);

  const [show, updateShow] = useLocalStorage('showSozialMarie', 'first');
  const isShow = show !== 'no-show' || !isAfter;
  const [open, setOpen] = useState(isShow);
  const [noShowChecked, setNoShowChecked] = useState(!isShow);

  const sozialMarieTranslations = t('sozialMarie', { returnObjects: true });

  useEffect(() => {
    if (isVoting) {
      setInitialTimeLeft(endDate - new Date());
    }
  }, [isVoting]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChecked = e => {
    updateShow(e.target.checked ? 'no-show' : 'show');
    setNoShowChecked(e.target.checked);
  };

  if (isAfter) {
    setTimeout(() => {
      const hasItem = !!localStorage.getItem('showSozialMarie');
      if (hasItem) {
        localStorage.removeItem('showSozialMarie');
      }
      setOpen(false);
    }, 5000);
  }

  return (
    <Stack style={{ marginLeft: 'auto', fontSize: '0.875rem' }}>
      <VotingButton
        date={countDownDate}
        handleClick={handleClick}
        isBeforeVoting={isBefore}
        isVoting={isVoting}
        isAfterVoting={isAfter}
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />

      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
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
          <Box component="header" marginBottom="1rem">
            <Typography component="h2" sx={{ textAlign: 'center', fontWeight: '600' }}>
              {sozialMarieTranslations.title}
            </Typography>
            <p>{sozialMarieTranslations.aboutSozialMarie}</p>
          </Box>
          <p>
            {sozialMarieTranslations.votingFor}
            {isBefore ? ` ${sozialMarieTranslations.start}` : null}
            {isVoting ? ` ${sozialMarieTranslations.end}` : null}:
          </p>
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
          <SozialMarieLink href={SOZIAL_MARIE_LINK} />

          <Box component="footer" marginTop="1rem">
            <AlertFooterContent checked={noShowChecked} handleChecked={handleChecked} />
          </Box>
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SozialMarie;
