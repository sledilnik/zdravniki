const ORIGIN = 'https://raw.githubusercontent.com';
const BASE_URL = new URL(ORIGIN);

const BASE_PATH = '/sledilnik/zdravniki-data/main/csv';

const INSTITUTIONS_CSV_PATH = `${BASE_PATH}/institutions.csv`;
const DOCTORS_PATH = `${BASE_PATH}/doctors.csv`;

export const INSTITUTIONS = new URL(INSTITUTIONS_CSV_PATH, BASE_URL);
export const DOCTORS = new URL(DOCTORS_PATH, BASE_URL);
