import useTimer from 'hooks/useTimer';
import { Alert, Box, Divider, Snackbar, Stack } from '@mui/material';
import { useLocalStorage } from 'hooks';
import { useEffect, useState, useCallback, useRef } from 'react';
import i18n, { t } from 'i18next';
import VotingButton from './VotingButton';
import AlertCountDown from './AlertCountDown';
import SozialMarieLink from './SozialMarieLink';
import AlertFooterContent from './AlertFooterContent';
import AlertContentHeader from './AlertHeaderContent';
import { startDate, endDate, doNotShowBefore } from './date-range';
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_VALUES, getInitialIsShow } from './localStorage';

const DELAY_TO_HIDE_ALERT = 5000;
const DELAY_TO_HIDE_TRIGGER = 6000;

if (DELAY_TO_HIDE_ALERT > DELAY_TO_HIDE_TRIGGER) {
  throw new Error('DELAY_TO_HIDE_ALERT should be less than DELAY_TO_HIDE_TRIGGER');
}

const SOZIAL_MARIE_LINK = `https://www.sozialmarie.org/${i18n.language === 'it' ? 'en' : i18n.language}`;

const SozialMarieBase = function SozialMarieBase() {
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
            <AlertContentHeader endDate={endDate} startDate={startDate} lang={i18n.language} />
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
              <AlertCountDown time={timeLeft} variant="simple" />
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
                  lang={i18n.language}
                />
              </Box>
            </>
          )}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

const envRespectDates = process.env?.REACT_APP_SM_SHOW_TRIGGER_BUTTON_IMMEDIATELY;
const donNotRespectDates = envRespectDates ? JSON.parse(envRespectDates) : false;

const SozialMarie = function SozialMarie() {
  const now = new Date();

  const [showSozialMarie, setShowSozialMarie] = useState(
    (doNotShowBefore < now && now < endDate) || Boolean(donNotRespectDates),
  );

  const timeoutIdRef = useRef();

  useEffect(() => {
    const timeoutId = timeoutIdRef?.current;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (!showSozialMarie) {
      timeoutIdRef.current = setTimeout(() => {
        setShowSozialMarie(true);
      }, doNotShowBefore - new Date());
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showSozialMarie]);
  return showSozialMarie ? <SozialMarieBase /> : null;
};

export default SozialMarie;
