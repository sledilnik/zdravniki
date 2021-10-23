import doctors from '../data/zdravniki.csv';
import gyno from '../data/ginekologi.csv';
import dentists from '../data/zobozdravniki.csv';
const PUBLIC_URL = 'http://localhost:3000/';

export const DOCTORS_URL = new URL(doctors, PUBLIC_URL);

export const GYNAECOLOGISTS_URL = new URL(gyno, PUBLIC_URL);

export const DENTISTS_URL = new URL(dentists, PUBLIC_URL);
