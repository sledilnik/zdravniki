import useTimer from 'hooks/useTimer';
import { getTimeDifference } from 'utils';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useLocalStorage } from 'hooks';
import { useState } from 'react';
import { t } from 'i18next';
import { SimpleCountDown } from 'components/Shared/CountDown';

const VOTING_STARTS = new Date('2024-04-09 GMT+0200');
const VOTING_ENDS = new Date('2024-04-16 23:59:59:999 GMT+0200');

const SozialMarie = function SozialMarie() {
  const isVoting = new Date() >= VOTING_STARTS && new Date() <= VOTING_ENDS;
  const isBeforeVoting = new Date() < VOTING_STARTS;
  const isAfterVoting = new Date() > VOTING_ENDS;

  const date = new Date() < VOTING_STARTS ? VOTING_STARTS : VOTING_ENDS;
  const [show, updateShow] = useLocalStorage('showSozialMarie', 'first');
  const isShow = show !== 'no-show';
  const [open, setOpen] = useState(isShow);
  const [noShowChecked, setNoShowChecked] = useState(!isShow);

  const sozialMarieTranslations = t('sozialMarie', { returnObjects: true });

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

  const timeLeft = useTimer(date - new Date());

  const { days, hours, minutes, seconds } = getTimeDifference(timeLeft);

  if (isAfterVoting) {
    return null;
  }

  return (
    <Stack style={{ marginLeft: 'auto', fontSize: '0.875rem' }}>
      <Tooltip
        title={
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <span>
              {isBeforeVoting ? sozialMarieTranslations.untilVotingStarts : null}
              {isVoting ? sozialMarieTranslations.untilVotingEnds : null}:
            </span>

            <SimpleCountDown
              date={date}
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />
          </Box>
        }
      >
        <Button type="button" aria-label="vote" onClick={handleClick} color="inherit">
          {sozialMarieTranslations.vote}!
        </Button>
      </Tooltip>

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
            {sozialMarieTranslations.votingFor}{' '}
            {isBeforeVoting ? sozialMarieTranslations.start : null}
            {isVoting ? sozialMarieTranslations.end : null}:
          </p>
          <Box display="flex" justifyContent="center" paddingBlock="0.5em" fontSize="1.5rem">
            <time dateTime={date}>
              {days} {t('time.day', { count: days })}, {hours} {t('time.hour', { count: hours })} ,{' '}
              {minutes} {t('time.minute', { count: minutes })} {sozialMarieTranslations.and}{' '}
              {seconds} {t('time.second', { count: seconds })}.
            </time>
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
