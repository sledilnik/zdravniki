/** @import * as Types from '../TaskA/types' */
import { detailTransformedData } from '../TaskA/json-data-transform-util';

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

export const detailDataMap = makeDetailDataMap();

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
      name: serie,
      yAxis: serie.includes('iozRatio') ? 1 : 0,
      data: serieData,
    };
  });

export const prepareDetailLineChartSeries = (
  doctorType = 'gp',
  serieNames = [
    'insuredPeopleCount',
    'insuredPeopleCountWithIOZ',
    'insuredPeopleCountWithoutIOZ',
    'iozRatio',
  ],
) => {
  const municipalities = Array.from(detailDataMap.keys());
  const data = collectData(municipalities, doctorType);
  const doctorTypeData = calculateSumOfInsuredPeopleCount(data);

  const chartSeries = transformToChartSeries(doctorTypeData, serieNames);

  return [...chartSeries];
};
