import { useEffect, useMemo, useState } from 'react';

import { t } from 'i18next';

import loMerge from 'lodash/merge';
import { prepareTaskSpecialChartOptions } from './data';

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
export const useChart = (initialOptions, { filterState }) => {
  const taskTranslation = useMemo(() => t(`analytics.taskSpecial`, { returnObjects: true }), []);
  const tCommon = useMemo(() => t('analytics.common', { returnObjects: true }), []);

  const { chartTitle } = taskTranslation;
  const yAxisTitle = taskTranslation.yAxis.title;

  const memoChartOptions = useMemo(
    () =>
      prepareTaskSpecialChartOptions({
        filterState,
        seriesTranslations: tCommon.data,
        chartTitle,
        yAxisTitle,
      }),
    [chartTitle, filterState, tCommon.data, yAxisTitle],
  );

  const memoOptions = useMemo(
    () => ({
      title: memoChartOptions.title,
      xAxis: memoChartOptions.xAxis,
      yAxis: memoChartOptions.yAxis,
      series: memoChartOptions.series,
      accessibility: memoChartOptions.accessibility,
    }),
    [memoChartOptions],
  );

  const [chartOptions, setChartOptions] = useState(loMerge(memoOptions, initialOptions));

  useEffect(() => {
    setChartOptions(loMerge(memoOptions));
  }, [memoOptions]);

  return { chartOptions, setChartOptions };
};
