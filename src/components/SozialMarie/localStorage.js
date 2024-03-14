export const LOCAL_STORAGE_KEY = 'showSozialMarie';

/**
 * @typedef {Object} LocalStorageValues
 * @property {"first"} first - The value for the 'first' key in local storage.
 * @property {"show"} show - The value for the 'show' key in local storage.
 * @property {"remind-me"} remindMe - The value for the 'remind-me' key in local storage.
 * @property {"no-show"} noShow - The value for the 'no-show' key in local storage.
 */

/** @type {LocalStorageValues} */
export const LOCAL_STORAGE_VALUES = {
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
export function getInitialIsShow(value, { isBefore, isVoting }) {
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
