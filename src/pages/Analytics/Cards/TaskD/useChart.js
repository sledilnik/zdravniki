import { useEffect, useMemo, useState } from 'react';

import { t } from 'i18next';
import loMerge from 'lodash/merge';

import { useParams } from 'react-router';
import { prepareTaskDChartOptions } from './data';

export const useChart = (initialOptions, { filterState, seriesToShow }) => {
  const { lng } = useParams();

  const tCommonData = useMemo(() => t('analytics.common.data', { returnObjects: true }), []);
  if (!seriesToShow.every(item => Object.keys(tCommonData).includes(item))) {
    throw new Error(`Missing translation for serie names: language: ${lng}`);
  }

  const chartTitle = t('analytics.common.chartTitle', {
    value: tCommonData[filterState.data],
  });

  const yAxisTitle = t(`analytics.taskD.yAxis.titles.${filterState.data}`);

  const memoChartOptions = useMemo(
    () =>
      prepareTaskDChartOptions({
        filterState,
        lng,
        chartTitle,
        yAxisTitle,
        seriesTranslations: tCommonData,
      }),
    [chartTitle, filterState, lng, tCommonData, yAxisTitle],
  );

  const [chartOptions, setChartOptions] = useState(loMerge(memoChartOptions, initialOptions));

  useEffect(() => {
    setChartOptions(memoChartOptions);
  }, [memoChartOptions]);

  return { chartOptions, setChartOptions };
};
