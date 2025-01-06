/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */

import { useEffect, useRef, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighMaps from 'highcharts/highmaps';
import { t } from 'i18next';

import { withErrorBoundary } from 'components/Shared/ErrorBoundary';
import Scorecard from 'pages/Analytics/components/Scorecard';
import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { Separator } from 'pages/Analytics/components/ui/separator';

import { mapOptions, secondChartOptions } from './chart-options';

import styles from '../MapAndChart.module.css';
import {
  DEFAULTS,
  prepareDetailLineChartSeries,
  prepareOverviewMapSeriesData,
  uniqueDoctorTypesSet,
  uniqueMunicipalitiesSet,
  uniqueYearsSet,
} from './data';
import { FilterForm } from './FilterForm';

/**
 *
 * @param {Types.UserInputsValues} initialFilterState
 * @param {{map: HighMaps.Options, chart: Highcharts.Options}} options
 * @param {boolean} init
 * @returns
 */
const useCharts = (initialFilterState, options, init) => {
  const [filterState, setFilterState] = useState(initialFilterState);
  const [mapChartOptions, setMapChartOptions] = useState(options.map);
  const [chartOptions, setChartOptions] = useState(options.chart);
  /** @type {[Types.OverviewDataMapSeriesDataItem, React.Dispatch<React.SetStateAction<Types.OverviewDataMapSeriesDataItem>>]} */
  const [selectedPoint, setSelectedPoint] = useState(
    options.map.series[0].data.find(d => d.selected),
  );

  useEffect(() => {
    if (!init) return;
    setMapChartOptions({
      plotOptions: {
        series: {
          point: {
            events: {
              click(e) {
                e.point.select(true, false);
                setFilterState(prev => ({
                  ...prev,
                  municipality: e.point.name,
                }));
              },
            },
          },
        },
      },
    });
  }, [init]);

  useEffect(() => {
    const data = prepareOverviewMapSeriesData(filterState);
    setMapChartOptions({
      series: [{ data }],
    });

    const sPoint = data.find(d => d.selected);
    setSelectedPoint(sPoint);

    const series = prepareDetailLineChartSeries(filterState);
    setChartOptions({
      series,
    });
  }, [filterState]);

  return {
    filterState,
    mapChartOptions,
    setFilterState,
    setMapChartOptions,
    chartOptions,
    setChartOptions,
    selectedPoint,
  };
};

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

  const { filterState, mapChartOptions, setFilterState, chartOptions, selectedPoint } = useCharts(
    DEFAULTS,
    {
      map: { ...mapOptions, title: { text: tTaskA.mapTitle } },
      chart: {
        ...secondChartOptions,
        title: { text: tTaskA.chartTitle },
      },
    },
    init,
  );

  const onFilterChange = e => {
    const { name, value } = e.target;
    const newValue = name === 'year' ? Number(value) : value;
    setFilterState({ ...filterState, [name]: newValue });
  };

  const currentInsuredPeopleCount = selectedPoint?.insuredPeopleCount ?? 0;
  const currentInsuredPeopleCountWithIOZ = selectedPoint?.insuredPeopleCountWithIOZ ?? 0;

  const previousYear = filterState.year - 1;
  const previousYearData = prepareOverviewMapSeriesData({
    ...filterState,
    year: previousYear,
  }).find(item => item.municipality === filterState.municipality);
  const previousYearInsuredPeopleCount = previousYearData?.insuredPeopleCount ?? 0;
  const previousYearInsuredPeopleCountWithIOZ = previousYearData?.insuredPeopleCountWithIOZ ?? 0;

  const changeInsuredPeopleCount = currentInsuredPeopleCount - previousYearInsuredPeopleCount;
  const changeInsuredPeopleCountWithIOZ =
    currentInsuredPeopleCountWithIOZ - previousYearInsuredPeopleCountWithIOZ;

  const trendInsuredPeopleCount = changeInsuredPeopleCount / previousYearInsuredPeopleCount;
  const trendInsuredPeopleCountWithIOZ =
    changeInsuredPeopleCountWithIOZ / previousYearInsuredPeopleCountWithIOZ;

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
              municipalities: [...uniqueMunicipalitiesSet],
              years: [...uniqueYearsSet].sort((a, b) => b - a),
              doctorTypes: [...uniqueDoctorTypesSet],
            }}
          />
        </CardContent>
        <CardContent className={styles.ScorecardsContainer}>
          <Scorecard
            valueLabel={filterState.year}
            changeLabel={previousYear}
            scorecardType="description"
          />
          <Scorecard
            label={tCommon.data.insuredPeopleCount}
            value={currentInsuredPeopleCount}
            change={trendInsuredPeopleCount}
          />
          <Scorecard
            label={tCommon.data.insuredPeopleCountWithIOZ}
            value={currentInsuredPeopleCountWithIOZ}
            change={trendInsuredPeopleCountWithIOZ}
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
          <CardTitle variant="subtitle">{filterState.municipality}</CardTitle>
          <div style={{ display: 'flex', gap: '0.5em', flexWrap: 'wrap' }}>
            <CardTitle as="span" variant="description">
              {tCommon.doctorTypes[filterState.doctorType]}
            </CardTitle>
          </div>
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
