import * as GEO_LOCATION from './geoLocation';

export * as DOCTORS from './doctors';
export * as SIZES from './sizes';
export * as CSV_URL from './csvURL';
export { default as THEME } from './theme';

const ZOOM = 8;
const MIN_ZOOM = 6;
const MAX_ZOOM = 16;

// http://bboxfinder.com/#45.421,13.355,46.895,16.638
const BOUNDS = {
  southWest: {
    lat: 45.421,
    lng: 13.355,
  },
  northEast: {
    lat: 46.894,
    lng: 16.637,
  },
};

export const MAP = { ZOOM, MIN_ZOOM, MAX_ZOOM, GEO_LOCATION, BOUNDS };
