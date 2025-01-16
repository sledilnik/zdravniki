/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { t } from 'i18next';
import loMerege from 'lodash/merge';

import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { Separator } from 'pages/Analytics/components/ui/separator';

import FilterForm from './FilterForm';

import { DEFAULTS, uniqueOverviewDoctorTypesSet } from '../TaskA/constants';
import { COLORS, options } from './chart-options';
import { prepareDetailLineChartSeries, seriesToShow } from './data';

import styles from '../Chart.module.css';

const TaskSpecial = function TaskSpecial({ id }) {
  const tTaskSpecial = t('analytics.taskSpecial', { returnObjects: true });
  const tCommon = t('analytics.common', { returnObjects: true });

  const [init, setInit] = useState(false);
  const [chartOptions, setChartOptions] = useState(
    loMerege(
      {
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
      },
      options,
    ),
  );
  const [filterState, setFilterState] = useState({
    doctorType: DEFAULTS.doctorType,
  });
  /** @type {React.RefObject<Types.HighchartsReactRefObject>} */
  const chartRef = useRef(null);

  useEffect(() => {
    if (!init) {
      setInit(true);
    }
  }, [init]);

  const { chartTitle } = tTaskSpecial;

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
      title: {
        text: chartTitle,
      },
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
    <Card id={id} className={styles.Chart}>
      <div className={styles.Grid}>
        <CardHeader className={styles.Header}>
          <CardTitle>{tTaskSpecial.title}</CardTitle>
        </CardHeader>
        <Separator className={styles.Separator} />
        <CardContent className={styles.FiltersContainer}>
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
        <CardContent className={styles.ChartContainer}>
          <figure>
            <HighchartsReact ref={chartRef} highcharts={Highcharts} options={chartOptions} />
          </figure>
        </CardContent>
      </div>
    </Card>
  );
};

export default TaskSpecial;
