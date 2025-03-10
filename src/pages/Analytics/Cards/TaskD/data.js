/** @import * as TaskDTypes from "./types" */

import Highcharts from 'highcharts';

import { labelsFormatter } from 'pages/Analytics/utils/utils';
import { parsedData } from './parsed-files';

export const seriesToShow = ['public', 'private'];
const colorIndex = [3, 4];

const prepareSeries = ({ filterState, seriesTranslations, serieNames = ['public', 'private'] }) => {
  const series = serieNames.map((serie, index) => {
    const serieData = parsedData.get(filterState.data)[serie];
    if (!serieData) {
      throw new Error(`Invalid serie name: ${serie}`);
    }
    return {
      id: serie,
      name: seriesTranslations[serie],
      data: serieData,
      color: Highcharts.getOptions().colors[colorIndex[index]],
    };
  });
  return series;
};

const prepareXAxisTickPositions = data => {
  const uniqueYears = new Set([
    ...data.public.map(point => new Date(point[0]).getUTCFullYear()),
    ...data.private.map(point => new Date(point[0]).getUTCFullYear()),
  ]);

  // Calculate tick positions for starting years
  const tickPositions = Array.from(uniqueYears)
    .sort((a, b) => a - b) // Ensure years are sorted
    .map(year => Date.UTC(year, 0, 1)); // Start of each year

  return tickPositions;
};

const prepareXAxis = series => ({
  tickPositions: prepareXAxisTickPositions(
    series.reduce((acc, serie) => {
      acc[serie.id] = serie.data;
      return acc;
    }, {}),
  ),
});

const prepareYAxis = (filterState, lng, title) => ({
  title: {
    text: title,
  },
  labels: {
    formatter() {
      return labelsFormatter.call(this, filterState.data, lng);
    },
  },
});

const prepareAccessibility = () => ({
  screenReaderSection: {
    beforeChartFormat: '<h4>{chartTitle}</h4>',
  },
});

export const prepareTaskDChartOptions = ({ filterState, translations, lng }) => {
  const series = prepareSeries({
    filterState,
    seriesTranslations: translations.series,
    seriesToShow,
  });

  return {
    title: { text: translations.title },
    subtitle: { text: translations.subtitle },
    xAxis: prepareXAxis(series),
    yAxis: prepareYAxis(filterState, lng, translations.yAxis.titles[filterState.data]),
    series,
    accessibility: prepareAccessibility(),
  };
};
