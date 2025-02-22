import { useEffect, useMemo, useState } from 'react';

import { t } from 'i18next';
import loMerge from 'lodash/merge';

import { useParams } from 'react-router';
import { prepareTaskDChartOptions } from './data';

export const useChart = (initialOptions, { filterState }) => {
  const { lng } = useParams();

  const chartTranslations = useMemo(() => t(`analytics.taskD.chart`, { returnObjects: true }), []);

  const memoChartOptions = useMemo(
    () =>
      prepareTaskDChartOptions({
        filterState,
        translations: chartTranslations,
        lng,
      }),
    [chartTranslations, filterState, lng],
  );

  const [chartOptions, setChartOptions] = useState(loMerge(memoChartOptions, initialOptions));

  useEffect(() => {
    setChartOptions(memoChartOptions);
  }, [memoChartOptions]);

  return { chartOptions, setChartOptions };
};
