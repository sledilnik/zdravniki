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
  municipalities: [],
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
  selected: municipality.includes(item.municipality),
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
    .map(item => transformItemForMapChart(item, propertyAsValue, filterState.municipalities));

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
 * @param {Exclude<Types.UserInputsValues, "year">} filterStateNoYear
 * @returns {LineChartSeries[]}
 */
export const prepareDetailLineChartSeries = (
  { municipalities, doctorType } = {
    municipalities: DEFAULTS.municipalities,
    doctorType: DEFAULTS.doctorType,
  },
) => {
  const selectedMunicipalities =
    municipalities.length > 0 ? municipalities : Array.from(detailDataMap.keys());

  const data = selectedMunicipalities
    .map(municipality => {
      const municipalityData = detailDataMap.get(municipality)?.get(doctorType);
      if (!municipalityData) {
        return [];
      }
      const ageGroupsKeys = Array.from(municipalityData.keys());
      return ageGroupsKeys.map(ageGroup => municipalityData.get(ageGroup));
    })
    .flat(Infinity);

  // sum insuredPeopleCount and insuredPeopleCountWithIOZ and calculate new iozRatio data for each year and ageGroup
  // console.log(data);
  const seriesData = data.reduce((acc, item) => {
    const { year, ageGroup, insuredPeopleCount, insuredPeopleCountWithIOZ } = item;

    acc[ageGroup] = acc[ageGroup] || {};
    acc[ageGroup][year] = acc[ageGroup][year] || {
      insuredPeopleCount: 0,
      insuredPeopleCountWithIOZ: 0,
      iozRatio: 0,
      id: `${ageGroup}-${year}`,
      name: `age group ${ageGroup}`,
    };
    acc[ageGroup][year].insuredPeopleCount += insuredPeopleCount;
    acc[ageGroup][year].insuredPeopleCountWithIOZ += insuredPeopleCountWithIOZ;
    acc[ageGroup][year].iozRatio =
      acc[ageGroup][year].insuredPeopleCountWithIOZ / acc[ageGroup][year].insuredPeopleCount;
    acc[ageGroup][year].x = year;
    acc[ageGroup][year].y = acc[ageGroup][year].iozRatio;
    return acc;
  }, {});

  return Object.entries(seriesData).map(([ageGroup, d]) => ({
    id: `ageGroup${ageGroup}`,
    name: `age group ${ageGroup}`,
    data: Object.values(d),
  }));
};

export const defaultDetailLineChartSeries = prepareDetailLineChartSeries().series;
