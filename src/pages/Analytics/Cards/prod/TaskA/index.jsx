/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */

// import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighMaps from 'highcharts/highmaps';
import { useEffect, useRef, useState } from 'react';

import { withErrorBoundary } from 'components/Shared/ErrorBoundary';
import { Separator } from 'pages/Analytics/components/ui/separator';

import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';

import { mapOptions } from './chart-options';

import styles from '../MapAndChart.module.css';
import {
  DEFAULTS,
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
  }, [filterState]);

  return { filterState, mapChartOptions, setFilterState, setMapChartOptions };
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

  useEffect(() => {
    setInit(true);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const { filterState, mapChartOptions, setFilterState } = useCharts(
    DEFAULTS,
    { map: mapOptions },
    init,
  );
  const onFilterChange = e => {
    const { name, value } = e.target;
    const newValue = name === 'year' ? Number(value) : value;
    setFilterState({ ...filterState, [name]: newValue });
  };

  return (
    <Card id={id} className={styles.MapAndChart}>
      <div className={styles.Grid}>
        <CardHeader className={styles.Header}>
          <CardTitle>TaskA</CardTitle>
        </CardHeader>
        <Separator style={{ gridArea: 'separator' }} />
        <CardContent className={styles.FilterContainer}>
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
        <CardContent className={styles.ScorecardContainer}>{/* Scorecard */}</CardContent>
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
        <CardContent className={styles.ChartContainer}>{/* ChartCard */}</CardContent>
      </div>
    </Card>
  );
};

export default withErrorBoundary(TaskA);
