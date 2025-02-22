/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from 'react';

import { t } from 'i18next';
import loMerge from 'lodash/merge';

import { useParams } from 'react-router';
import { prepareDetailLineChartSeries } from '../TaskA/detail-data-util';

export const useChart = (initialOptions, { filterState }) => {
  const { lng } = useParams();

  const chartTranslations = t('analytics.taskATrend', { returnObjects: true });
  const { doctorType } = filterState;

  const memoChartOptions = useMemo(
    () => prepareDetailLineChartSeries([], doctorType),
    [doctorType],
  );

  const [chartOptions, setChartOptions] = useState(loMerge(memoChartOptions, initialOptions));

  useEffect(() => {
    setChartOptions(memoChartOptions);
  }, [memoChartOptions]);

  return { chartOptions, setChartOptions };
};
