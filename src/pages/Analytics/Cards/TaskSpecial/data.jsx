/** @import * as Types from '../TaskA/types' */
import { detailTransformedData } from '../TaskA/json-data-transform-util';
import { COLORS } from './chart-options';

export const seriesToShow = Object.freeze(['insuredPeopleCount', 'insuredPeopleCountWithoutIOZ']);

/**
 * @description
 * @returns {Types.DetailByMunicipalityAndTypeAndAgeGroupMap}
 */
const makeDetailDataMap = () => {
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

const detailDataMap = makeDetailDataMap();

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
 * @typedef {Omit<Types.DetailDataTransformedOutput, 'municipality' | 'ageGroup'>} DetailDataNeki
 *
 * @typedef {Map<number, DetailDataNeki[]>} DoctorTypeSummaryMap
 * */

/**
 * @function calculateSumOfInsuredPeopleCount
 * @description Calculates sum of insured people count (total, with and without IOZ separately) for each doctor type for each year and calculates iozRatio.
 * @param {Types.DetailDataTransformedOutput[]}
 * @returns {DoctorTypeSummaryMap}
 */
const calculateSumOfInsuredPeopleCount = data => {
  /** @type {DoctorTypeSummaryMap} */
  const yearDataMap = new Map();
  data.forEach(item => {
    const { year, doctorType } = item;

    if (!yearDataMap.has(year)) {
      yearDataMap.set(year, {
        doctorType,
        year,
        insuredPeopleCount: 0,
        insuredPeopleCountWithIOZ: 0,
        insuredPeopleCountWithoutIOZ: 0,
        iozRatio: 0,
      });
    }

    const yearData = yearDataMap.get(year);

    const { insuredPeopleCount, insuredPeopleCountWithIOZ } = yearData;

    yearDataMap.set(year, {
      ...yearData,
      insuredPeopleCount: insuredPeopleCount + item.insuredPeopleCount,
      insuredPeopleCountWithIOZ: insuredPeopleCountWithIOZ + item.insuredPeopleCountWithIOZ,
      insuredPeopleCountWithoutIOZ:
        insuredPeopleCount +
        item.insuredPeopleCount -
        (insuredPeopleCountWithIOZ + item.insuredPeopleCountWithIOZ),
      iozRatio: insuredPeopleCount > 0 ? insuredPeopleCountWithIOZ / insuredPeopleCount : 0,
    });
  });
  return yearDataMap;
};

/**
 * @function transformToChartSeries
 * @description Transforms data to chart series format. Each series is an object with id, name and data properties. name property is the values of series, y is year and x is the value of the series.
 * @param {Types.DoctorType} doctorType
 * @param {DoctorTypeSummaryMap} data
 * @param {("insuredPeopleCount" | "insuredPeopleCountWithIOZ" | "insuredPeopleCountWithoutIOZ" | "iozRatio")[]} series
 * @returns {Types.LineChartSeries}
 */
export const transformToChartSeries = (data, series) =>
  series.flatMap(serie => {
    const keys = [...data.keys()];
    /** @type {Types.LineChartSeries.data[number]} */
    const serieData = [];
    keys.forEach(key => {
      const item = data.get(key);

      serieData.push({
        ...item,
        x: item.year,
        y: item[serie],
      });
    });
    return {
      id: serie,
      yAxis: serie.includes('iozRatio') ? 1 : 0,
      color: COLORS[serie],
      data: serieData,
    };
  });

/**
 * @function prepareDetailLineChartSeries
 * @description Prepares data for line chart.
 * @param {Omit<Types.UserInputsValues, "year" | "municipalities">} filterState - Doctor type filter.
 * @param {string[]} serieNames - List of series to show.
 * @returns {Types.LineChartSeries[]}
 */
export const prepareDetailLineChartSeries = (
  filterState = { doctorType: 'gp' },
  seriesTranslations = {},
  serieNames = [
    'insuredPeopleCount',
    'insuredPeopleCountWithIOZ',
    'insuredPeopleCountWithoutIOZ',
    'iozRatio',
  ],
) => {
  const municipalities = Array.from(detailDataMap.keys());
  const data = collectData(municipalities, filterState.doctorType);
  const doctorTypeData = calculateSumOfInsuredPeopleCount(data);

  const chartSeries = transformToChartSeries(doctorTypeData, serieNames).map(serie => ({
    ...serie,
    name: seriesTranslations[serie.id],
  }));

  return chartSeries;
};

const prepareXAxis = series => {
  const categories = [...new Set(series.flatMap(serie => serie.data.map(item => item.x)))].sort(
    (a, b) => a - b,
  );
  return { categories };
};

const prepareYAxis = title => [{ title: { text: title } }];

const prepareAccessibility = () => ({
  screenReaderSection: {
    beforeChartFormat: '<h4>{chartTitle}</h4>',
  },
});

export const prepareTaskSpecialChartOptions = ({
  filterState,
  seriesTranslations,
  yAxisTitle,
  chartTitle,
}) => {
  const series = prepareDetailLineChartSeries(filterState, seriesTranslations, seriesToShow);
  const xAxis = prepareXAxis(series);

  return {
    title: { text: chartTitle },
    series,
    xAxis,
    yAxis: prepareYAxis(yAxisTitle),
    accessibility: prepareAccessibility(),
  };
};
