/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */

import { useEffect, useMemo, useRef, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighMaps from 'highcharts/highmaps';
import { t } from 'i18next';

import { withErrorBoundary } from 'components/Shared/ErrorBoundary';
import Scorecard from 'pages/Analytics/components/Scorecard';
import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { Separator } from 'pages/Analytics/components/ui/separator';

import { mapOptions, secondChartOptions } from './chart-options';
import {
  DEFAULTS,
  uniqueOverviewDoctorTypesSet,
  uniqueOverviewMunicipalitiesSet,
  uniqueOverviewYearsSet,
} from './constants';

import styles from '../MapAndChart.module.css';
import { prepareDetailLineChartSeries } from './detail-data-util';
import { FilterForm } from './FilterForm';
import { useCharts } from './hooks';
import { prepareOverviewMapSeriesData } from './overview-data-util';
import { calculateYearlyStatistics } from './scorecards-calc-util';

/**
 * TaskA component
 * A card component that displays the TaskA card.
 * It uses the Card component from the ui folder.
 * @param {string} id - The ID of the taskA card.
 * @returns {JSX.Element} The rendered TaskA component.
 */
const TaskA = function TaskA({ id }) {
  const [init, setInit] = useState(false);
  const mapRef = useRef(null);

  const tTaskA = t('analytics.taskA', { returnObjects: true });
  const tCommon = t('analytics.common', { returnObjects: true });

  useEffect(() => {
    setInit(true);
  }, []);

  const {
    filterState,
    mapChartOptions,
    setFilterState,
    chartOptions,
    setMapChartOptions,
    setChartOptions,
  } = useCharts(
    DEFAULTS,
    {
      map: { ...mapOptions, title: { text: tTaskA.mapTitle } },
      chart: {
        ...secondChartOptions,
        title: { text: tTaskA.chartTitle },
      },
    },
    init,
    mapRef.current?.chart,
  );

  const { municipalities, doctorType } = filterState;

  const mapSeriesData = useMemo(() => prepareOverviewMapSeriesData(filterState), [filterState]);
  const chartSeries = useMemo(
    () => prepareDetailLineChartSeries(municipalities, doctorType),
    [doctorType, municipalities],
  );

  useEffect(() => {
    setMapChartOptions({
      series: [{ data: mapSeriesData }],
    });

    setChartOptions({
      series: chartSeries,
    });
  }, [mapSeriesData, chartSeries, setMapChartOptions, setChartOptions]);

  const onFilterChange = e => {
    const { name, value } = e.target;

    const newValue = name === 'year' ? Number(value) : value;
    setFilterState({ ...filterState, [name]: newValue });
  };

  const currentSelectedYear = Number(filterState.year);
  const stats = useMemo(
    () => calculateYearlyStatistics(currentSelectedYear, chartSeries),
    [currentSelectedYear, chartSeries],
  );

  return (
    <Card id={id} className={styles.MapAndChart}>
      <div className={styles.Grid}>
        <CardHeader className={styles.Header}>
          <CardTitle>{tTaskA.title}</CardTitle>
        </CardHeader>
        <Separator style={{ gridArea: 'separator' }} />
        <CardContent className={styles.FiltersContainer}>
          <FilterForm
            filterState={filterState}
            onChange={onFilterChange}
            filterOptions={{
              municipalities: [...uniqueOverviewMunicipalitiesSet],
              years: [...uniqueOverviewYearsSet].sort((a, b) => b - a),
              doctorTypes: [...uniqueOverviewDoctorTypesSet],
            }}
          />
        </CardContent>
        <CardContent className={styles.ScorecardsContainer}>
          <Scorecard
            valueLabel={filterState.year}
            changeLabel={filterState.year - 1}
            scorecardType="description"
          />
          <Scorecard
            label={tCommon.data.insuredPeopleCount}
            value={stats.currentYear.insuredPeopleCount}
            change={stats.differences.insuredPeopleCount.ratio}
          />
          <Scorecard
            label={tCommon.data.insuredPeopleCountWithIOZ}
            value={stats.previousYear.insuredPeopleCount}
            change={stats.differences.insuredPeopleCountWithIOZ.ratio}
          />
        </CardContent>
        <CardContent className={styles.MapContainer}>
          <figure>
            <HighchartsReact
              ref={mapRef}
              highcharts={HighMaps}
              constructorType="mapChart"
              options={mapChartOptions}
            />
          </figure>
        </CardContent>
        <CardContent className={styles.ChartContainer}>
          <figure>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              constructorType="chart"
            />
          </figure>
        </CardContent>
      </div>
    </Card>
  );
};

export default withErrorBoundary(TaskA);
