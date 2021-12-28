const ORIGIN = 'https://raw.githubusercontent.com';
const BASE_URL = new URL(ORIGIN);

const BASE_PATH = '/sledilnik/zdravniki-data/main/csv';

const INSTITUTIONS_CSV_PATH = `${BASE_PATH}/institutions.csv`;
const DOCTORS_CSV_PATH = `${BASE_PATH}/doctors.csv`;

const DOCTORS_TS_PATH = `${BASE_PATH}/doctors.csv.timestamp`;
const INSTITUTIONS_TS_PATH = `${BASE_PATH}/institutions.csv.timestamp`;

export const INSTITUTIONS = new URL(INSTITUTIONS_CSV_PATH, BASE_URL);
export const DOCTORS = new URL(DOCTORS_CSV_PATH, BASE_URL);
export const DOCTORS_TS = new URL(DOCTORS_TS_PATH, BASE_URL);
export const INSTITUTIONS_TS = new URL(INSTITUTIONS_TS_PATH, BASE_URL);
