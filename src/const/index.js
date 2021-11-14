import * as GEO_LOCATION from './geoLocation';

export * as DOCTORS from './doctors';
export * as SIZES from './sizes';
export * as CSV_URL from './csvURL';

const ZOOM = 8;
const MIN_ZOOM = 8;
const MAX_ZOOM = 16;

export const MAP = { ZOOM, MIN_ZOOM, MAX_ZOOM, GEO_LOCATION };
