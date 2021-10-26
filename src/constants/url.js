import doctors from '../data/zdravniki.csv';
import gyno from '../data/ginekologi.csv';
import dentists from '../data/zobozdravniki.csv';
const isProd = process.env.NODE_ENV === 'production';

let PUBLIC_URL = process.env.PUBLIC_URL
  ? process.env.PUBLIC_URL
  : isProd
  ? 'http://localhost:5000/'
  : 'http://localhost:3000/';

export const DOCTORS_URL = new URL(doctors, PUBLIC_URL);

export const GYNAECOLOGISTS_URL = new URL(gyno, PUBLIC_URL);

export const DENTISTS_URL = new URL(dentists, PUBLIC_URL);
