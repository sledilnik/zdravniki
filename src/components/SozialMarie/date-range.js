import { ONE_SECOND_MILLISECONDS } from '../../const/time';
import { getDevVotingDateRange } from './getDevVotingDateRange';

// Safari and iOS don't support the date format 'YYYY-MM-DD HH:MM GMT+0200' https://www.coditty.com/code/javascript-new-date-not-working-on-ie-and-safari
const VOTING_STARTS = 'Tue Apr 09 2024 00:00:00 GMT+0200';
const VOTING_ENDS = 'Wed Apr 17 2024 00:00:00 GMT+0200';

const now = new Date(new Date().setMilliseconds(0));
const dateRange =
  process.env.NODE_ENV === 'development'
    ? getDevVotingDateRange(now, 5000, ONE_SECOND_MILLISECONDS * 10)
    : [new Date(VOTING_STARTS), new Date(VOTING_ENDS)];

export const startDate = dateRange[0];
export const endDate = dateRange[1];
