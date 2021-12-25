const ORIGIN = 'https://raw.githubusercontent.com';
const BASE_URL = new URL(ORIGIN);

const BASE_PATH = '/sledilnik/zdravniki-data/main/csv';

const INSTITUTIONS_CSV_PATH = `${BASE_PATH}/dict-institutions.csv`;
const DOCTORS_PATH = `${BASE_PATH}/doctors.csv`;
const DOCTORS_OVERRIDES_PATH = `${BASE_PATH}/doctors-overrides.csv`;

export const INSTITUTIONS = new URL(INSTITUTIONS_CSV_PATH, BASE_URL);
export const DOCTORS = new URL(DOCTORS_PATH, BASE_URL);
export const DOCTORS_OVERRIDES = new URL(DOCTORS_OVERRIDES_PATH, BASE_URL);
