import useTimer from 'hooks/useTimer';
import { Alert, Box, Divider, Snackbar, Stack, Typography } from '@mui/material';
import { useLocalStorage } from 'hooks';
import { useEffect, useState, useCallback } from 'react';
import i18n, { t } from 'i18next';
import VotingButton from './VotingButton';
import { getDevVotingDateRange } from './getDevVotingDateRange';
import AlertCountDown from './AlertCountDown';
import SozialMarieLink from './SozialMarieLink';
import AlertFooterContent from './AlertFooterContent';

const INTL_LANGS = {
  en: 'en-GB',
  de: 'de-DE',
  sl: 'sl-SI',
  hr: 'hr-HR',
  it: 'it-IT',
  hu: 'hu-HU',
};

const ONE_DAY = 24 * 60 * 60 * 1000;

function getIntlFormatOptions(dateRangeInMilliseconds) {
  if (dateRangeInMilliseconds > ONE_DAY) {
    return {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
  }

  // for dev purposes
  return {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
}

const VOTING_STARTS = '2024-04-09 GMT+0200';
const VOTING_ENDS = '2024-04-17 GMT+0200';
const SOZIAL_MARIE_LINK = 'https://www.sozialmarie.org/sl';

const now = new Date(new Date().setMilliseconds(0));
const [startDate, endDate] =
  process.env.NODE_ENV === 'development'
    ? getDevVotingDateRange(now, 5000, ONE_DAY / 24 / 180)
    : [new Date(VOTING_STARTS), new Date(VOTING_ENDS)];

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

  const sozialMarieTranslations = t('sozialMarie', { returnObjects: true });

  useEffect(() => {
    if (isVoting) {
      setTimeLeft(Math.floor((endDate - new Date()) / 1000) * 1000);
    }
  }, [isVoting, timeLeft, setTimeLeft]);

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
    [updateShow, setNoShowChecked],
  );

  if (isAfter) {
    setTimeout(() => {
      const hasItem = !!localStorage.getItem('showSozialMarie');
      if (hasItem) {
        localStorage.removeItem('showSozialMarie');
      }
      setOpen(false);
    }, 5000);
  }

  const intlDate = Intl.DateTimeFormat(
    INTL_LANGS[i18n.language],
    getIntlFormatOptions(endDate - startDate),
  );

  const dateRange = intlDate.formatRange(startDate, endDate);

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
          <Box component="header" textAlign="center">
            <Typography component="h2" fontWeight={600}>
              {sozialMarieTranslations.title}
            </Typography>

            <Typography
              component="time"
              dateTime={`${intlDate.format(startDate)}-${intlDate.format(endDate)}`}
              fontSize="0.875rem"
            >
              {dateRange}
            </Typography>
          </Box>
          <Divider />
          <Box component="p" textAlign="left">
            {sozialMarieTranslations.aboutSozialMarie}
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
          <SozialMarieLink href={SOZIAL_MARIE_LINK} />
          <Divider />
          <Box component="footer">
            <AlertFooterContent checked={noShowChecked} handleChecked={handleChecked} />
          </Box>
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SozialMarie;
