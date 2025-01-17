/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { t } from 'i18next';
import loMerege from 'lodash/merge';

import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { Separator } from 'pages/Analytics/components/ui/separator';

import { cx } from 'class-variance-authority';
import FilterForm from './FilterForm';

import { DEFAULTS, uniqueOverviewDoctorTypesSet } from '../TaskA/constants';
import { COLORS, options } from './chart-options';
import { prepareDetailLineChartSeries, seriesToShow } from './data';

import styles from '../Cards.module.css';

const TaskSpecial = function TaskSpecial({ id }) {
  const tTaskSpecial = t('analytics.taskSpecial', { returnObjects: true });
  const tCommon = t('analytics.common', { returnObjects: true });

  const [init, setInit] = useState(false);
  const [filterState, setFilterState] = useState({
    doctorType: DEFAULTS.doctorType,
  });

  const chartTitle = t('analytics.taskSpecial.chartTitle', {
    value: tCommon.doctorTypes[filterState.doctorType],
  });

  const [chartOptions, setChartOptions] = useState(
    loMerege(
      {
        title: {
          text: chartTitle,
        },
        series: seriesToShow.map(name => ({
          name: tCommon.data[name],
          color: COLORS[name],
        })),
        yAxis: [
          {
            id: 'count',
            title: { text: tTaskSpecial.yAxis.title },
          },
        ],
        accessibility: {
          screenReaderSection: {
            beforeChartFormat: '<h4>{chartTitle}</h4>',
          },
        },
      },
      options,
    ),
  );

  /** @type {React.RefObject<Types.HighchartsReactRefObject>} */
  const chartRef = useRef(null);

  useEffect(() => {
    if (!init) {
      setInit(true);
    }
  }, [init]);

  const chartSeries = useMemo(
    () =>
      prepareDetailLineChartSeries(filterState.doctorType, seriesToShow).map(serie => ({
        ...serie,
      })),

    [filterState.doctorType],
  );

  useEffect(() => {
    if (!init) return;

    setChartOptions({
      xAxis: {
        categories: [...new Set(chartSeries.flatMap(serie => serie.data.map(item => item.x)))].sort(
          (a, b) => a - b,
        ),
      },
      series: chartSeries,
    });
  }, [init, chartTitle, chartSeries]);

  const onFilterChange = e => {
    const { name, value } = e.target;

    setFilterState({ ...filterState, [name]: value });
  };

  return (
    <Card id={id} className={styles.CardWrapper}>
      <div className={cx(styles.Grid, styles.SingleChartGrid)}>
        <CardHeader className={styles.Header}>
          <CardTitle as="h3">{tTaskSpecial.title}</CardTitle>
        </CardHeader>
        <Separator className={styles.Separator} />
        <CardContent className={styles.FiltersWrapper}>
          <FilterForm
            filterState={filterState}
            onChange={onFilterChange}
            filterOptions={{
              doctorTypes: [...uniqueOverviewDoctorTypesSet].filter(item =>
                ['gp', 'den', 'gyn'].includes(item),
              ),
            }}
          />
        </CardContent>
        <CardContent className={styles.ChartWrapper}>
          <figure>
            <HighchartsReact ref={chartRef} highcharts={Highcharts} options={chartOptions} />
          </figure>
        </CardContent>
      </div>
    </Card>
  );
};

export default TaskSpecial;
