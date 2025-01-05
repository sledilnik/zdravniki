/** @import * as Types from "./types" */

import overviewData from 'assets/data/analytics/task-a/podatki-overview.json';
import { overviewSchemaTransformed } from './schemas';

export const overviewDataTransform = data => {
  const safeData = overviewSchemaTransformed.safeParse(data);
  if (!safeData.success) {
    // eslint-disable-next-line no-console
    console.error('Data transformation failed:', {
      errors: safeData.error.errors,
      originalData: data,
    });
    return null;
  }
  return safeData.data;
};

/**
 * @constant overviewTransformedData
 * @description Array of transformed overview data
 * @type {Types.OverviewDataTransformedOutput[]}
 */
export const overviewTransformedData = overviewData.map(overviewDataTransform).filter(Boolean);
// eslint-disable-next-line no-console
console.assert(
  overviewTransformedData.length === overviewData.length,
  "Some data wasn't transformed",
);

export const uniqueYearsSet = new Set(overviewTransformedData.map(item => item.year));
export const uniqueDoctorTypesSet = new Set(overviewTransformedData.map(item => item.doctorType));
export const uniqueMunicipalitiesSet = new Set(
  overviewTransformedData.map(item => item.municipality),
);

/**
 *
 * @description
 * @returns {Types.DoctorTypeDataMap}
 */
export const makeOverviewDataMap = () => {
  /** @type {Types.DoctorTypeDataMap} */
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
 *
 * @param {Types.OverviewDataTransformedOutput} item
 * @param {Types.PropertyAsValue} propertyAsValue
 * @param {Types.Municipality} municipality
 * @returns {Types.OverviewDataMapSeriesDataItem}
 */
export const transformItem = (item, propertyAsValue, municipality) => ({
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
    .map(item => transformItem(item, propertyAsValue, filterState.municipality));

  // eslint-disable-next-line no-console
  console.assert(
    seriesData.length === data.length,
    'Some data was filtered out during transformation',
  );

  return seriesData;
};

export const defaultOverviewMapSeriesData = prepareOverviewMapSeriesData();
