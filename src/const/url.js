import doctors from '../data/zdravniki.csv';
import gyno from '../data/ginekologi.csv';
import dentists from '../data/zobozdravniki.csv';
const isProd = process.env.NODE_ENV === 'production';

let PUBLIC_URL = process.env.PUBLIC_URL
  ? process.env.PUBLIC_URL
  : isProd
  ? 'http://localhost:5000/'
  : 'http://localhost:3000/';

export const DOCTORS = new URL(doctors, PUBLIC_URL);

export const GYNAECOLOGISTS = new URL(gyno, PUBLIC_URL);

export const DENTISTS = new URL(dentists, PUBLIC_URL);
