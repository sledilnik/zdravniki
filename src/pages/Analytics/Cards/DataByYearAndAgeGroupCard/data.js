/** @import * as Types from "../../types"  */

import sloMunicipalitiesJSON from 'assets/data/slovenia_municipalities.json';

/**
 * @typedef {"0-17" | "18-25" | "26-35" | "36-45" | "46-55" | "56-65" | "65+"} AgeGroup
 */

/**
 * @typedef {2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 } Year
 */

/**
 * @constant {AgeGroup[]} AGE_GROUPS
 * @type {AgeGroup[]}
 */
export const AGE_GROUPS = ['0-17', '18-25', '26-35', '36-45', '46-55', '56-65', '65+'];

/**
 * @constant {Year[]} YEARS
 * @type {Year[]}
 */
export const YEARS = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

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
export function generateFakeData(municipalities) {
  const fakeData = [];

  municipalities.forEach(municipality => {
    YEARS.forEach(year => {
      AGE_GROUPS.forEach(ageGroup => {
        fakeData.push({
          name: municipality,
          value: Math.floor(Math.random() * 1000) / 100, // Random value between 0 and 999
          year,
          ageGroup,
        });
      });
    });
  });

  return fakeData;
}

export const fakeData = generateFakeData(sloMunicipalitiesJSON);

/**
 * @template CityName
 * @template Year
 * @template AgeRange
 *
 * @typedef {Object} AgeRangeData
 * @property {number} value - The value associated with this age range.
 *
 * @typedef {Object<string, AgeRangeData>} YearData - Data for a single year, where keys are age ranges.
 *
 * @typedef {Object<string, YearData>} CityData - Data for a city, where keys are years.
 *
 * @typedef {Object<CityName, CityData>} CityRecord - Data for a record, where keys are city names.
 *
 * @typedef {CityRecord[]} CityRecordArray - Array of city records.
 */

/**
 * @type {CityRecordArray<string, Year, AgeGroup>}
 */
export const cityRecords = fakeData.reduce((acc, item) => {
  if (!acc[item.name]) {
    acc[item.name] = {};
  }
  if (!acc[item.name][item.year]) {
    acc[item.name][item.year] = {};
  }
  acc[item.name][item.year][item.ageGroup] = { value: item.value };
  return acc;
}, {});
