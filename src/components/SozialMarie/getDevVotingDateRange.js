import { addMilliseconds } from 'utils';

export function getDevVotingDateRange(
  now = new Date(),
  startDelay = 5000,
  addToEndDelay = 5000,
  doNotShowBeforeDelay = 5000,
) {
  if (!(now instanceof Date)) {
    throw new TypeError('The now parameter must be a Date object.');
  }

  if (typeof startDelay !== 'number' || startDelay < 0) {
    throw new TypeError('The startDelay parameter must be a non-negative number.');
  }

  if (typeof addToEndDelay !== 'number' || addToEndDelay < 0) {
    throw new TypeError('The endDelay parameter must be a non-negative number.');
  }
  const noShow = addMilliseconds(now, doNotShowBeforeDelay);
  const starts = addMilliseconds(noShow, startDelay);
  const ends = addMilliseconds(starts, addToEndDelay);

  return [starts, ends, noShow];
}
