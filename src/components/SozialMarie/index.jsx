import useTimer from 'hooks/useTimer';
import { getTimeDifference } from 'utils';
import { Alert, Box, Checkbox, FormControlLabel, Snackbar, Stack, Typography } from '@mui/material';
import { useLocalStorage } from 'hooks';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import VotingButton from './VotingButton';
import { getDevVotingDateRange } from './getDevVotingDateRange';

const VOTING_STARTS = '2024-04-09 GMT+0200';
const VOTING_ENDS = '2024-04-16 23:59:59:999 GMT+0200';

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

  const daysText = days >= 1 ? `${days} ${t('time.day', { count: days })}, ` : '';
  const hoursText = hours >= 1 ? `${hours} ${t('time.hour', { count: hours })}, ` : '';
  const minutesText =
    minutes >= 1
      ? `${minutes} ${t('time.minute', { count: minutes })} ${sozialMarieTranslations.and} `
      : '';

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
          <Box component="header" sx={{ marginBottom: '1rem' }}>
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
              <time dateTime={countDownDate}>
                {daysText}
                {hoursText}
                {minutesText}
                {seconds} {t('time.second', { count: seconds })}
              </time>
            )}
          </Box>
          <p>
            {sozialMarieTranslations.clicking}{' '}
            <a href="#some-url" target="_blank" rel="noopener noreferrer">
              {sozialMarieTranslations.thisLink}
            </a>{' '}
            {sozialMarieTranslations.inNewTab}
          </p>
          <FormControlLabel
            labelPlacement="start"
            control={
              <Checkbox
                name="no-show"
                checked={noShowChecked}
                onChange={handleChecked}
                size="small"
              />
            }
            label={sozialMarieTranslations.noShow}
            sx={{
              marginInline: 0,
              '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
            }}
          />
          <footer>
            <p>{sozialMarieTranslations.seeAlert}</p>
          </footer>
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SozialMarie;
