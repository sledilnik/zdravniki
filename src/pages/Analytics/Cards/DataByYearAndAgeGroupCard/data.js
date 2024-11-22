/** @import * as Types from "../../types"  */

import sloMunicipalitiesJSON from 'assets/data/slovenia_municipalities.json';

/**
 * @typedef {"0-17" | "18-25" | "26-35" | "36-45" | "46-55" | "56-65" | "65+"} AgeGroup
 */

/**
 * @typedef {2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 } Year
 */

/**
 * temporary to until we get the real data
 * @constant {AgeGroup[]} AGE_GROUPS
 * @type {AgeGroup[]}
 */
const AGE_GROUPS = ['0-17', '18-25', '26-35', '36-45', '46-55', '56-65', '65+'];

/**
 * temporary to until we get the real data
 * @constant {Year[]} YEARS
 * @type {Year[]}
 */
const YEARS = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

/**
 * @typedef {Object} AgeGroupItem
 * @property {string} name - The name of the item.
 * @property {number} value - The value of the item.
 * @property {Year} year - The year of the item.
 * @property {AgeGroup} ageGroup - The age group of the item.
 */

/**
 * Generates fake AgeGroupItem data for each municipality, year, and age group.
 * @param {string[]} municipalities - List of municipality names.
 * @returns {AgeGroupItem[]} - List of generated AgeGroupItem objects.
 */
function generateFakeData(municipalities) {
  const data = [];

  municipalities.forEach(municipality => {
    YEARS.forEach(year => {
      AGE_GROUPS.forEach(ageGroup => {
        data.push({
          name: municipality,
          value: Math.floor(Math.random() * 1000) / 100, // Random value between 0 and 999
          year,
          ageGroup,
        });
      });
    });
  });

  return data;
}

export const fakeData = generateFakeData(sloMunicipalitiesJSON);

/**
 * @constant {Object} DATA
 * @type {Object}
 * @property {string[]} MUNICIPALITIES - List of municipality names.
 * @property {AgeGroup[]} AGE_GROUPS - List of age groups.
 * @property {Year[]} YEARS - List of years.
 */
export const DATA = {
  MUNICIPALITIES: [...new Set(fakeData.map(item => item.name))],
  AGE_GROUPS: [...new Set(fakeData.map(item => item.ageGroup))],
  YEARS: [...new Set(fakeData.map(item => item.year))],
};

/**
 * @type {Map<AgeGroup, AgeGroupItem[]>}
 */
export const byAgeGroupMap = new Map(
  [...AGE_GROUPS].map(ageGroup => [ageGroup, fakeData.filter(item => item.ageGroup === ageGroup)]),
);
