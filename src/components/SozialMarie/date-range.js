import { getDevVotingDateRange } from './getDevVotingDateRange';

const ONE_DAY = 24 * 60 * 60 * 1000;

const VOTING_STARTS = '2024-04-09 GMT+0200';
const VOTING_ENDS = '2024-04-17 GMT+0200';

const now = new Date(new Date().setMilliseconds(0));
const dateRange =
  process.env.NODE_ENV === 'development'
    ? getDevVotingDateRange(now, 5000, ONE_DAY / 24 / 360)
    : [new Date(VOTING_STARTS), new Date(VOTING_ENDS)];

export const startDate = dateRange[0];
export const endDate = dateRange[1];
