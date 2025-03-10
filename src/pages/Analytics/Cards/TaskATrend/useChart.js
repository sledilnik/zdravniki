import { useEffect, useMemo, useState } from 'react';

import { t } from 'i18next';
import loMerge from 'lodash/merge';

import { prepareDetailLineChartSeries } from '../TaskA/detail-data-util';

export const useChart = (initialOptions, { filterState }) => {
  const { doctorType, municipalities } = filterState;

  const memoChartSeries = useMemo(
    () => prepareDetailLineChartSeries(municipalities, doctorType),
    [doctorType, municipalities],
  );

  const cities = municipalities.join(', ') || t('analytics.common.buttons.allCities');
  const doctorTypeTranslation = t(`analytics.common.doctorTypes.${doctorType}`);

  const title = t('analytics.taskATrend.chart.title');
  const subtitle = t('analytics.taskATrend.chart.subtitle', {
    doctorType: doctorTypeTranslation,
    cities,
  });

  const chartTitles = useMemo(
    () => ({
      title: {
        text: title,
      },
      subtitle: {
        text: subtitle,
      },
    }),
    [subtitle, title],
  );

  const [chartOptions, setChartOptions] = useState(
    loMerge(initialOptions, { series: memoChartSeries, ...chartTitles }),
  );

  useEffect(() => {
    setChartOptions({ series: memoChartSeries, ...chartTitles });
  }, [chartTitles, chartTitles.chart, memoChartSeries]);

  return { chartOptions, setChartOptions, chartSeries: memoChartSeries };
};
