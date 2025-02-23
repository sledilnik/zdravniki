/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from 'react';

import { t } from 'i18next';
import loMerge from 'lodash/merge';

import { useParams } from 'react-router';
import { prepareDetailLineChartSeries } from '../TaskA/detail-data-util';

export const useChart = (initialOptions, { filterState }) => {
  const { lng } = useParams();

  const chartTranslations = t('analytics.taskATrend', { returnObjects: true });
  const { doctorType, municipalities } = filterState;

  const memoChartSeries = useMemo(
    () => prepareDetailLineChartSeries(municipalities, doctorType),
    [doctorType, municipalities],
  );

  const [chartOptions, setChartOptions] = useState(
    loMerge(initialOptions, { series: memoChartSeries }),
  );

  useEffect(() => {
    setChartOptions({ series: memoChartSeries });
  }, [memoChartSeries]);

  return { chartOptions, setChartOptions, chartSeries: memoChartSeries };
};
