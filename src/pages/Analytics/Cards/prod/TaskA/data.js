/** @import * as Types from "./types" */

import detailData from 'assets/data/analytics/task-a/podatki-detail.json';
import overviewData from 'assets/data/analytics/task-a/podatki-overview.json';
import { detailSchemaTransformed, overviewSchemaTransformed } from './schemas';

const isDev = process.env.NODE_ENV === 'development';
export const overviewDataTransform = data => {
  const safeData = overviewSchemaTransformed.safeParse(data);
  if (!safeData.success) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.error('Error transforming overview data.', {
        message: 'Validation failed while parsing overview data.',
        details: safeData.error.errors.map(err => ({
          path: err.path.join(' > '), // Path to the failing field
          issue: err.message, // Description of the issue
        })),
        originalData: data,
        hint: 'Ensure the data conforms to the expected schema. Check for missing or incorrect fields.',
      });
    }
    return null;
  }
  return safeData.data;
};

export const detailDataTransform = data => {
  const safeData = detailSchemaTransformed.safeParse(data);
  if (!safeData.success) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.error('Error transforming detail data.', {
        message: 'Validation failed while parsing detail data.',
        details: safeData.error.errors.map(err => ({
          path: err.path.join(' > '), // Path to the failing field
          issue: err.message, // Description of the issue
        })),
        originalData: data,
        hint: 'Ensure the data conforms to the expected schema. Check for missing or incorrect fields.',
      });
    }
    return null;
  }
  return safeData.data;
};

/**
 * @constant overviewTransformedData
 * @description Array of transformed overview data
 * @type {Types.OverviewDataTransformedOutput[]}
 */
export const overviewTransformedData = overviewData
  .map(overviewDataTransform)
  .filter(Boolean)
  .sort((a, b) => {
    if (a.year === b.year) {
      return a.municipality.localeCompare(b.municipality);
    }
    return b.year - a.year;
  });
// eslint-disable-next-line no-console
console.assert(
  overviewTransformedData.length === overviewData.length,
  "Some data wasn't transformed",
);

/**
 * @constant detailTransformedData
 * @description Array of transformed detail data
 * @type {Types.DetailDataTransformedOutput[]}
 */
export const detailTransformedData = detailData
  .map(detailDataTransform)
  .filter(Boolean)
  .sort((a, b) => {
    if (a.year === b.year) {
      return a.municipality.localeCompare(b.municipality);
    }
    return b.year - a.year;
  });
// eslint-disable-next-line no-console
console.assert(detailTransformedData.length === detailData.length, "Some data wasn't transformed");

export const uniqueYearsSet = new Set(overviewTransformedData.map(item => item.year));
export const uniqueDoctorTypesSet = new Set(overviewTransformedData.map(item => item.doctorType));
export const uniqueMunicipalitiesSet = new Set(
  overviewTransformedData.map(item => item.municipality),
);

/**
 *
 * @description
 * @returns {Types.OverviewByYearAndTypeMap}
 */
export const makeOverviewDataMap = () => {
  /** @type {Types.OverviewByYearAndTypeMap} */
  const doctorTypeDataMap = new Map();

  overviewTransformedData.forEach(item => {
    if (!doctorTypeDataMap.has(item.year)) {
      doctorTypeDataMap.set(item.year, new Map());
    }
    const yearData = doctorTypeDataMap.get(item.year);

    if (!yearData.has(item.doctorType)) {
      yearData.set(item.doctorType, []);
    }
    yearData.get(item.doctorType).push(item);
  });

  return doctorTypeDataMap;
};

export const overviewDataMap = makeOverviewDataMap();

/**
 * @description
 * @returns {Types.DetailByMunicipalityAndTypeAndAgeGroupMap}
 */
export const makeDetailDataMap = () => {
  /** @type {Types.DetailByMunicipalityAndTypeAndAgeGroupMap} */
  const doctorTypeDataMap = new Map();
  detailTransformedData.forEach(item => {
    if (!doctorTypeDataMap.has(item.municipality)) {
      doctorTypeDataMap.set(item.municipality, new Map());
    }
    const municipalityData = doctorTypeDataMap.get(item.municipality);
    if (!municipalityData.has(item.doctorType)) {
      municipalityData.set(item.doctorType, new Map());
    }
    const doctorTypeData = municipalityData.get(item.doctorType);
    if (!doctorTypeData.has(item.ageGroup)) {
      doctorTypeData.set(item.ageGroup, []);
    }
    doctorTypeData.get(item.ageGroup).push(item);
  });
  return doctorTypeDataMap;
};

export const detailDataMap = makeDetailDataMap();

/**
 * @constant DEFAULTS
 * @description Doctor type data map key is year and doctor type value is array of data
 * @type {Types.UserInputsValues}
 */
export const DEFAULTS = Object.freeze({
  year: `${Math.max(...uniqueYearsSet)}`,
  doctorType: 'gp',
  municipality: [...uniqueMunicipalitiesSet][0],
});

/**
 * @function transformItemForMapChart
 * @param {Types.OverviewDataTransformedOutput} item
 * @param {Types.PropertyAsValue} propertyAsValue
 * @param {Types.Municipality} municipality
 * @returns {Types.OverviewDataMapSeriesDataItem}
 */
export const transformItemForMapChart = (item, propertyAsValue, municipality) => ({
  ...item,
  value: item[propertyAsValue],
  selected: item.municipality === municipality,
});

/**
 * @function prepareOverviewMapSeriesData
 * @description Prepare data for the map series
 * @param {Types.UserInputsValues} filterState
 * @param {Types.PropertyAsValue} propertyAsValue
 * @returns {Types.OverviewDataMapSeriesDataItem[]}
 */
export const prepareOverviewMapSeriesData = (
  filterState = DEFAULTS,
  propertyAsValue = 'iozRatio',
) => {
  const data = overviewDataMap.get(Number(filterState.year))?.get(filterState.doctorType);
  if (!data) {
    return [];
  }

  const seriesData = data
    .filter(item => item[propertyAsValue] != null)
    .map(item => transformItemForMapChart(item, propertyAsValue, filterState.municipality));

  // eslint-disable-next-line no-console
  console.assert(
    seriesData.length === data.length,
    'Some data was filtered out during transformation',
  );

  return seriesData;
};

export const defaultOverviewMapSeriesData = prepareOverviewMapSeriesData();

/**
 * @function transformItenForLineChart
 * @param {Types.DetailDataTransformedOutput} item
 * @param {Types.PropertyAsValue} propertyAsValue
 * @returns {Types.DetailDataMapSeriesDataItem}
 */
export const transformItenForLineChart = (item, propertyAsValue) => ({
  ...item,
  x: Number(item.year),
  y: item[propertyAsValue],
});

/**
 * @typedef {Object} LineChartSeries
 * @property {string} id
 * @property {string} name
 * @property {Types.DetailDataMapSeriesDataItem[]} data
 *
 * @function prepareDetailLineChartSeriesData
 * @description Prepare data for the line chart series
 * @param {Types.UserInputsValues} filterState
 * @param {Types.PropertyAsValue} propertyAsValue
 * @returns {LineChartSeries[]}
 */
export const prepareDetailLineChartSeries = (
  filterState = DEFAULTS,
  propertyAsValue = 'iozRatio',
) => {
  const data = detailDataMap.get(filterState.municipality)?.get(filterState.doctorType);

  if (!data) {
    return [];
  }

  const ageGroups = [...data.keys()];

  return ageGroups.map(ageGroup => {
    const ageGroupData = data
      .get(ageGroup)
      .filter(item => item[propertyAsValue] != null)
      .map(item => transformItenForLineChart(item, propertyAsValue));

    // eslint-disable-next-line no-console
    console.assert(
      ageGroupData.length === data.get(ageGroup).length,
      'Some data was filtered out during transformation',
    );
    return { id: `ageGroup${ageGroup}`, name: `age group ${ageGroup}`, data: ageGroupData };
  });
};

export const defaultDetailLineChartSeries = prepareDetailLineChartSeries();
