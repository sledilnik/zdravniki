import { useEffect, useMemo, useState } from 'react';

import { t } from 'i18next';

import loMerge from 'lodash/merge';
import { prepareTaskSpecialChartOptions } from './data';

export const useChart = (initialOptions, { filterState, notVisibleSeries = [] }) => {
  const { doctorType } = filterState;
  const title = t(`analytics.taskSpecial.chart.title`, {
    value: t(`analytics.common.doctorTypes.${doctorType}`),
  });
  const subtitle = t(`analytics.taskSpecial.chart.subtitle`);

  const chartTranslations = useMemo(
    () => ({
      ...t(`analytics.taskSpecial.chart`, { returnObjects: true }),
      title,
      subtitle,
    }),
    [subtitle, title],
  );

  const memoChartOptions = useMemo(
    () =>
      prepareTaskSpecialChartOptions({
        filterState,
        translations: chartTranslations,
      }),
    [filterState, chartTranslations],
  );

  const memoOptions = useMemo(
    () => ({
      title: memoChartOptions.title,
      subtitle: memoChartOptions.subtitle,
      xAxis: memoChartOptions.xAxis,
      yAxis: memoChartOptions.yAxis,
      series: memoChartOptions.series,
      accessibility: memoChartOptions.accessibility,
    }),
    [memoChartOptions],
  );

  const [chartOptions, setChartOptions] = useState(
    loMerge(memoOptions, initialOptions, {
      series: memoOptions.series.map(serie => ({
        ...serie,
        visible: !notVisibleSeries.includes(serie.id),
      })),
    }),
  );

  useEffect(() => {
    setChartOptions(loMerge(memoOptions));
  }, [memoOptions]);

  return { chartOptions, setChartOptions };
};
