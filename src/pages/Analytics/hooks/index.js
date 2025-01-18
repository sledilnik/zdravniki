/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from 'react';

import { t } from 'i18next';
import loMerge from 'lodash/merge';
import { COLORS as taskDColors } from '../Cards/TaskD/chart-options';
import { COLORS as taskSpecialColors } from '../Cards/TaskSpecial/chart-options';
import {
  prepareDetailLineChartSeries as prepareTaskSpecialSeries,
  seriesToShow as taskSpecialSeriesToShow,
} from '../Cards/TaskSpecial/data';

/**
 * A custom React hook for managing a filter state object.
 *
 * @template T - The shape of the filter state.
 * @param {T} initialState - The initial state of the filter.
 * @returns {{
 *   filterState: T, // The current filter state.
 *   setFilterState: React.Dispatch<React.SetStateAction<T>>, // Function to update the filter state.
 *   onFilterChange: (key: keyof T, value: T[keyof T]) => void // Function to update a specific key in the filter state.
 * }} - The filter state management functions and state.
 */
export const useFilterState = initialState => {
  const [filterState, setFilterState] = useState(initialState);

  const onFilterChange = e => {
    const { name, value } = e.target;
    setFilterState(prev => ({ ...prev, ...e.target, [name]: value }));
  };

  return { filterState, setFilterState, onFilterChange };
};

const colorsMap = {
  taskSpecial: taskSpecialColors,
  taskD: taskDColors,
};

const seriesMap = {
  taskSpecial: { func: prepareTaskSpecialSeries, args: [['doctorType'], 'seriesToShow'] },
};

const seriesToShowMap = {
  taskSpecial: taskSpecialSeriesToShow,
};

/**
 * A custom React hook for managing chart options.
 *
 * @param {Highcharts.Options} extraOptions - Additional options to merge with the initial options.
 * @param {Highcharts.Options} initialOptions - The initial options for the chart.
 * @param {string} taskName
 * @return {{
 *    chartOptions: Highcharts.Options,
 *    setChartOptions: React.Dispatch<React.SetStateAction<Highcharts.Options>>
 * }} - merge of the initial and extra options.
 */
export const useChartOptions = ({ initialOptions, taskName, filterState }) => {
  const taskTranslation = useMemo(
    () => t(`analytics.${taskName}`, { returnObjects: true }),
    [taskName],
  );
  const tCommon = useMemo(() => t('analytics.common', { returnObjects: true }), []);
  const { chartTitle } = taskTranslation;

  const chartSeries = useMemo(
    () =>
      seriesMap[taskName].func(filterState, seriesToShowMap[taskName]).map(serie => ({
        ...serie,
        color: colorsMap[taskName][serie.id],
        name: tCommon.data[serie.id],
      })),
    [filterState, tCommon.data, taskName],
  );

  const xAxisCategories = useMemo(
    () =>
      [...new Set(chartSeries.flatMap(serie => serie.data.map(item => item.x)))].sort(
        (a, b) => a - b,
      ),
    [chartSeries],
  );

  const yAxisTitle = taskTranslation.yAxis.title;

  const memoOptions = useMemo(
    () => ({
      title: { text: chartTitle },
      xAxis: { categories: xAxisCategories },
      yAxis: [{ title: { text: yAxisTitle } }],
      series: chartSeries,
      accessibility: {
        screenReaderSection: {
          beforeChartFormat: '<h4>{chartTitle}</h4>',
        },
      },
    }),
    [chartTitle, xAxisCategories, yAxisTitle, chartSeries],
  );

  const [chartOptions, setChartOptions] = useState(loMerge(memoOptions, initialOptions));

  useEffect(() => {
    setChartOptions(loMerge(memoOptions));
  }, [memoOptions]);

  return { chartOptions, setChartOptions };
};
