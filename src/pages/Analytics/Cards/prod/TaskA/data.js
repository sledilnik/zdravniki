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
 * @default year `${Math.max(...uniqueYearsSet)}`
 * @default doctorType 'gp'
 * @default municipalities []
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
 * Aggregates data by age group and year, computing metrics like `iozRatio`.
 * @param {Types.AggregatedDataMap} acc - The accumulator for aggregated data.
 * @param {Types.DetailDataTransformedOutput} item - A single data item to aggregate.
 * @returns {Types.AggregatedDataMap} Updated accumulator.
 */
const aggregateByYearAndAgeGroup = (acc, item) => {
  const { year, ageGroup, insuredPeopleCount, insuredPeopleCountWithIOZ } = item;

  // Get or initialize the age group map
  const yearDataMap = acc.get(ageGroup) || new Map();

  // Get or initialize the year data
  const yearData = yearDataMap.get(year) || {
    insuredPeopleCount: 0,
    insuredPeopleCountWithIOZ: 0,
    iozRatio: 0,
    id: `${ageGroup}-${year}`,
    name: `Age Group ${ageGroup}`,
    year,
  };

  // Update year data
  yearData.insuredPeopleCount += insuredPeopleCount;
  yearData.insuredPeopleCountWithIOZ += insuredPeopleCountWithIOZ;
  yearData.iozRatio =
    yearData.insuredPeopleCount > 0
      ? yearData.insuredPeopleCountWithIOZ / yearData.insuredPeopleCount
      : 0;

  // Update maps
  yearDataMap.set(year, yearData);
  acc.set(ageGroup, yearDataMap);

  return acc;
};

/**
 * Collects and flattens data for selected municipalities and doctor types.
 * @param {string[]} municipalities - List of selected municipalities.
 * @param {string} doctorType - Doctor type filter.
 * @returns {Types.DetailDataTransformedOutput[]} Collected data.
 */
const collectData = (municipalities, doctorType) =>
  municipalities.flatMap(municipality => {
    const data = detailDataMap.get(municipality)?.get(doctorType);
    return data ? Array.from(data.values()).flat() : [];
  });

/**
 * Converts aggregated data into a format suitable for Highcharts.
 * @param {Types.AggregatedDataMap} aggregatedData - The aggregated data map.
 * @param {string} xProp - Property to use as the x-axis value.
 * @param {string} yProp - Property to use as the y-axis value.
 * @returns {Types.LineChartSeries[]} Highcharts-compatible series data.
 */
const transformToChartSeries = (aggregatedData, xProp, yProp) =>
  Array.from(aggregatedData.entries()).map(([ageGroup, yearDataMap]) => ({
    id: `ageGroup${ageGroup}`,
    name: `Age Group ${ageGroup}`,
    data: Array.from(yearDataMap.values()).map(item => ({
      ...item,
      x: item[xProp],
      y: item[yProp],
    })),
  }));

/**
 * Prepares data for the line chart series.
 * @param {typeof DEFAULTS["municipalities"]} municipalities - List of selected municipalities.
 * @param {typeof DEFAULTS["doctorType"]} doctorType - Doctor type filter.
 * @param {{ xProp?: string, yProp?: string }} options - Configuration for axis mapping. Defaults to `year` and `iozRatio`. // TODO add better types
 * @default municipalities DEFAULTS.municipalities = []
 * @default doctorType DEFAULTS.doctorType = "gp"
 * @default options { xProp: 'year', yProp: 'iozRatio' }
 * @returns {Types.LineChartSeries[]} Prepared line chart series data.
 */
export const prepareDetailLineChartSeries = (
  municipalities = DEFAULTS.municipalities,
  doctorType = DEFAULTS.doctorType,
  { xProp = 'year', yProp = 'iozRatio' } = {},
) => {
  // Use all municipalities if none are selected
  const selectedMunicipalities =
    municipalities.length > 0 ? municipalities : Array.from(detailDataMap.keys());

  // Step 1: Collect data
  const collectedData = collectData(selectedMunicipalities, doctorType);

  /**
   * @type {Types.AggregatedDataMap}
   */
  const accInitial = new Map();

  // Step 2: Aggregate data using the properly typed Map
  const aggregatedData = collectedData.reduce(
    (acc, item) => aggregateByYearAndAgeGroup(acc, item),
    accInitial,
  );

  // Step 3: Transform to chart series
  return transformToChartSeries(aggregatedData, xProp, yProp);
};

export const defaultDetailLineChartSeries = prepareDetailLineChartSeries();
