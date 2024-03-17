import L from 'leaflet';
import { v4 as uuidv4 } from 'uuid';

import {
  ONE_DAY_IN_MILLISECONDS,
  ONE_HOUR_IN_MILLISECONDS,
  ONE_MINUTE_IN_MILLISECONDS,
  ONE_SECOND_MILLISECONDS,
} from 'const/time';

function normalize(value) {
  // Replace all non ASCII chars and replace them with closest equivalent (č => c)
  return value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036F]/g, '');
}

export function fromArrayWithHeader(arr = [], uniqueFieldName = '') {
  const header = arr[0];

  // it's dirty but quick fix while doctor's id might to be available in the future.
  const idIndex = header.findIndex(item => item === uniqueFieldName);
  if (uniqueFieldName && idIndex === -1)
    throw new Error(`Field "${uniqueFieldName}" does not exist!`);

  const data = arr.slice(1, -1);
  return data.reduce((acc1, dataItem) => {
    const type = dataItem.reduce(
      (acc2, value, index) => ({
        ...acc2,
        [header[index]]: value,
      }),
      {},
    );

    const key = idIndex !== -1 ? dataItem[idIndex] : uuidv4();

    if (idIndex === -1) {
      type.key = key;
    }
    return {
      ...acc1,
      [key]: type,
    };
  }, {});
}

export function filterBySearchValueInMapBounds({ searchValue = '', filtered = [], bounds }) {
  const sortedQuery = normalize(searchValue)
    .split(' ')
    .sort((a, b) => b.length - a.length);

  return filtered?.filter(doctor => {
    const { lat, lon } = doctor.geoLocation;
    const corner = L.latLng(lat, lon);
    const calculatedBounds = L.latLngBounds(corner, corner);

    if (!searchValue) {
      return bounds.intersects(calculatedBounds);
    }

    let normalizedName = normalize(doctor.name);

    const isNameSearchValue = sortedQuery.every(q => {
      const includesQuery = normalizedName.includes(q);
      if (includesQuery) {
        normalizedName = normalizedName.replace(q, '');
      }
      return includesQuery;
    });

    const isAddressOrProviderSearchValue = [
      normalize(doctor.searchAddress),
      normalize(doctor.provider),
    ].some(v => v.includes(normalize(searchValue)));

    return (
      bounds.intersects(calculatedBounds) && (isNameSearchValue || isAddressOrProviderSearchValue)
    );
  });
}

/**
 * @typedef {Object} TimeDifference
 * @property {number} days - The time difference in days.
 * @property {number} hours - The time difference in hours.
 * @property {number} minutes - The time difference in minutes.
 * @property {number} seconds - The time difference in seconds.
 */

/**
 * Calculates the time difference in days, hours, minutes, and seconds.
 *
 * @param {number} diff - The time difference in milliseconds.
 * @returns {TimeDifference} - An object containing the time difference in days, hours, minutes, and seconds.
 */
export function getTimeDifference(diff) {
  const diffAbs = Math.abs(diff);

  const days = Math.floor(diffAbs / ONE_DAY_IN_MILLISECONDS);
  const hours = Math.floor((diffAbs % ONE_DAY_IN_MILLISECONDS) / ONE_HOUR_IN_MILLISECONDS);
  const minutes = Math.floor((diffAbs % ONE_HOUR_IN_MILLISECONDS) / ONE_MINUTE_IN_MILLISECONDS);
  const seconds = Math.floor((diffAbs % ONE_MINUTE_IN_MILLISECONDS) / ONE_SECOND_MILLISECONDS);
  return { days, hours, minutes, seconds };
}

/**
 * Returns a string representing the time duration for datetime attr in time html tag.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
 * @see https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-duration-string
 *
 * @param {Object} duration - The duration object.
 * @param {number} duration.days - The number of days.
 * @param {number} duration.hours - The number of hours.
 * @param {number} duration.minutes - The number of minutes.
 * @param {number} duration.seconds - The number of seconds.
 * @returns {string} The time duration in ISO 8601 format.
 */
export function getTimeDurationAttrValue({ days, hours, minutes, seconds }) {
  if (days > 0) {
    return `P${days}DT${hours}H${minutes}M${seconds}S`;
  }
  if (hours > 0) {
    return `PT${hours}H${minutes}M${seconds}S`;
  }
  if (minutes > 0) {
    return `PT${minutes}M${seconds}S`;
  }
  return `PT${seconds}S`;
}

export function addMilliseconds(date, ms) {
  return new Date(date.getTime() + ms);
}
