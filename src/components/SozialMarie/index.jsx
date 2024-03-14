import useTimer from 'hooks/useTimer';
import { Alert, Box, Divider, Snackbar, Stack } from '@mui/material';
import { useLocalStorage } from 'hooks';
import { useEffect, useState, useCallback } from 'react';
import i18n, { t } from 'i18next';
import VotingButton from './VotingButton';
import AlertCountDown from './AlertCountDown';
import SozialMarieLink from './SozialMarieLink';
import AlertFooterContent from './AlertFooterContent';
import AlertContentHeader from './AlertHeaderContent';
import { startDate, endDate } from './date-range';

const DELAY_TO_HIDE_ALERT = 5000;
const DELAY_TO_HIDE_TRIGGER = 6000;

if (DELAY_TO_HIDE_ALERT > DELAY_TO_HIDE_TRIGGER) {
  throw new Error('DELAY_TO_HIDE_ALERT should be less than DELAY_TO_HIDE_TRIGGER');
}

const SOZIAL_MARIE_LINK = `https://www.sozialmarie.org/${i18n.language === 'it' ? 'en' : i18n.language}`;

const LOCAL_STORAGE_KEY = 'showSozialMarie';

/**
 * @typedef {Object} LocalStorageValues
 * @property {"first"} first - The value for the 'first' key in local storage.
 * @property {"show"} show - The value for the 'show' key in local storage.
 * @property {"remind-me"} remindMe - The value for the 'remind-me' key in local storage.
 * @property {"no-show"} noShow - The value for the 'no-show' key in local storage.
 */

/** @type {LocalStorageValues} */
const LOCAL_STORAGE_VALUES = {
  first: 'first',
  show: 'show',
  remindMe: 'remind-me',
  noShow: 'no-show',
};

/**
 * @typedef {LocalStorageValues[keyof LocalStorageValues]} LocalStorageValue
 */

/**
 * Determines the initial value of the "isShow" flag based on the provided value and options.
 *
 * Always returns true if the value is "first" or "show".
 *
 * Before voting starts, returns false if the value is "remind-me" or "no-show".
 *
 * During voting, returns false if the value is "no-show" and true if the value is "remind-me".
 *
 * Othervise returns false.
 *
 * @param {LocalStorageValue} value - The value to check against.
 * @param {Object} options - The options object.
 * @param {boolean} options.isBefore - Indicates if it is before a certain event.
 * @param {boolean} options.isVoting - Indicates if it is during a voting period.
 * @returns {boolean} - The initial value of the "isShow" flag.
 */
function getInitialIsShow(value, { isBefore, isVoting }) {
  if ([LOCAL_STORAGE_VALUES.first, LOCAL_STORAGE_VALUES.show].includes(value)) {
    return true;
  }

  if (isBefore && [LOCAL_STORAGE_VALUES.remindMe, LOCAL_STORAGE_VALUES.noShow].includes(value)) {
    return false;
  }

  if (isVoting && value === LOCAL_STORAGE_VALUES.noShow) {
    return false;
  }

  if (isVoting && value === LOCAL_STORAGE_VALUES.remindMe) {
    return true;
  }

  return false;
}

const SozialMarie = function SozialMarie() {
  const currentDate = new Date();
  const countDownDate = currentDate < startDate ? startDate : endDate;
  const isVoting = currentDate >= startDate && currentDate < endDate;
  const isBefore = currentDate < startDate;
  const isAfter = currentDate >= endDate;
  const roundedInitialTime = Math.floor((countDownDate - currentDate) / 1000) * 1000;
  const [timeLeft, setTimeLeft] = useTimer(roundedInitialTime);

  const [localStorageVal, updateLocalstorageVal] = useLocalStorage(LOCAL_STORAGE_KEY, 'first');
  const isShow = getInitialIsShow(localStorageVal, { isBefore, isVoting });
  const [open, setOpen] = useState(isShow);
  const [noShowChecked, setNoShowChecked] = useState(!isShow);

  const [votingExpired, setVotingExpired] = useState(false);

  const sozialMarieTranslations = t('sozialMarie', { returnObjects: true });

  if (isVoting && localStorageVal === LOCAL_STORAGE_VALUES.remindMe) {
    updateLocalstorageVal(LOCAL_STORAGE_VALUES.noShow);
  }

  useEffect(() => {
    if (isVoting) {
      setTimeLeft(Math.floor((endDate - new Date()) / 1000) * 1000);
    }
  }, [isVoting, timeLeft, setTimeLeft]);

  useEffect(() => {
    let timeoutId;
    if (isAfter) {
      timeoutId = setTimeout(() => {
        const hasItem = !!localStorage.getItem(LOCAL_STORAGE_KEY);
        if (hasItem) {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
        setOpen(false);
      }, DELAY_TO_HIDE_ALERT);
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
      }, DELAY_TO_HIDE_TRIGGER);
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
      const localstorageCheckedValue = isBefore
        ? LOCAL_STORAGE_VALUES.remindMe
        : LOCAL_STORAGE_VALUES.noShow;
      updateLocalstorageVal(
        e.target.checked ? localstorageCheckedValue : LOCAL_STORAGE_VALUES.show,
      );
      setNoShowChecked(e.target.checked);
    },
    [updateLocalstorageVal, isBefore],
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
              <AlertCountDown date={countDownDate} time={timeLeft} variant="simple" />
            )}
          </Box>
          {isAfter ? null : (
            <>
              <SozialMarieLink href={SOZIAL_MARIE_LINK} />
              <Divider />
              <Box component="footer">
                <AlertFooterContent
                  checked={noShowChecked}
                  handleChecked={handleChecked}
                  isBefore={isBefore}
                />
              </Box>
            </>
          )}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SozialMarie;
