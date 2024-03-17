import { ONE_SECOND_MILLISECONDS } from '../../const/time';
import { getDevVotingDateRange } from './getDevVotingDateRange';

// Safari and iOS don't support the date format 'YYYY-MM-DD HH:MM GMT+0200' https://www.coditty.com/code/javascript-new-date-not-working-on-ie-and-safari
const SM_VOTING_STARTS = 'Tue Apr 09 2024 00:00:00 GMT+0200';
const SM_VOTING_ENDS = 'Wed Apr 17 2024 00:00:00 GMT+0200';
const SM_DO_NOT_SHOW_BEFORE = 'Tue Apr 02 2024 00:00:00 GMT+0200';

const delayToVotingStart = ONE_SECOND_MILLISECONDS * 5;
const votingTime = ONE_SECOND_MILLISECONDS * 30;
// Test for SozialMarie will fail if this delay is too big.
// For testing purposes set env variable REACT_APP_SM_SHOW_TRIGGER_BUTTON_IMMEDIATELY to true
// It will show the button immediately and you can test the button functionality.
const delayToNotShowBefore = ONE_SECOND_MILLISECONDS * 10;

const now = new Date(new Date().setMilliseconds(0));
const dateRange =
  process.env.NODE_ENV === 'development'
    ? getDevVotingDateRange(now, delayToVotingStart, votingTime, delayToNotShowBefore)
    : [new Date(SM_VOTING_STARTS), new Date(SM_VOTING_ENDS), new Date(SM_DO_NOT_SHOW_BEFORE)];

export const startDate = dateRange[0];
export const endDate = dateRange[1];
export const doNotShowBefore = dateRange[2];
