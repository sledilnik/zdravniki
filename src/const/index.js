import * as GEO_LOCATION from './geoLocation';

export * as DOCTORS from './doctors';
export * as SIZES from './sizes';
export * as CSV_URL from './csvURL';
export { default as THEME } from './theme';

const ZOOM = 8;
const MIN_ZOOM = 8;
const MAX_ZOOM = 16;
const BOUNDS = {
  southWest: {
    lat: 44.914249368747086,
    lng: 12.991333007812502,
  },
  northEast: {
    lat: 47.37603463349758,
    lng: 16.655273437500004,
  },
};

export const MAP = { ZOOM, MIN_ZOOM, MAX_ZOOM, GEO_LOCATION, BOUNDS };
