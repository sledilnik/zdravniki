import { useEffect, useMemo, useState } from 'react';

import { t } from 'i18next';

import loMerge from 'lodash/merge';
import { useParams } from 'react-router';
import { prepareTaskSpecialChartOptions } from './data';

export const useChart = (initialOptions, { filterState, notVisibleSeries = [] }) => {
  const { lng } = useParams();
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
        lng,
      }),
    [filterState, chartTranslations, lng],
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
    loMerge(
      memoOptions,
      {
        series: memoOptions.series.map(serie => ({
          ...serie,
          visible: !notVisibleSeries.includes(serie.id),
        })),
      },
      initialOptions,
    ),
  );

  useEffect(() => {
    setChartOptions(memoOptions);
  }, [memoOptions]);

  return { chartOptions, setChartOptions };
};
