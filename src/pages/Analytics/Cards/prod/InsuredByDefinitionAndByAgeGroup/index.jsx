/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */

/** @import * as Types from "./types" */

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighMaps from 'highcharts/highmaps';
import { merge as loMerge } from 'lodash';
import Scorecard from 'pages/Analytics/components/Scorecard';
import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { DATA } from 'pages/Analytics/data/fake-data';
import { useEffect, useMemo, useRef, useState } from 'react';
import { mapOptions, secondChartOptions } from './chart-options';

import {
  ASSIGNED_TYPES,
  calculateAssignedTypesTotals,
  CONTRACT_TYPES,
  CONTRACT_TYPES_MAP,
  DEFAULTS,
  DOCTOR_TYPES,
  DOCTOR_TYPES_MAP,
  getMapSeriesData,
  getSecondChartSeriesData,
} from './data';
import { FilterForm } from './FilterForm';

const { YEARS, AGE_GROUPS, MUNICIPALITIES } = DATA;

/**
 *
 * @param {Types.UserInputsValues} initialFilterState
 * @param {{map: Highcharts.Options, chart: Highcharts.Options}} options
 * @param {boolean} init
 * @returns
 */
const useCharts = (initialFilterState, options, init) => {
  const [filterState, setFilterState] = useState(initialFilterState);
  /** @type {[Highcharts.Options, React.Dispatch<React.SetStateAction<Highcharts.Options>>]} */
  const [mapChartOptions, setMapChartOptions] = useState(options.map);
  /** @type {[Highcharts.Options, React.Dispatch<React.SetStateAction<Highcharts.Options>>]} */
  const [barChartOptions, setBarChartOptions] = useState(
    loMerge({}, options.chart, {
      title: { text: initialFilterState.municipality },
    }),
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
    const mapSeriesData = getMapSeriesData(filterState);
    setMapChartOptions({
      series: [
        {
          data: mapSeriesData.map(item => ({
            ...item,
            selected: item.municipality === filterState.municipality,
          })),
        },
      ],
    });
    const newBarChartSeriesData = getSecondChartSeriesData(filterState);
    setBarChartOptions({
      series: [
        { data: newBarChartSeriesData.assigned },
        { data: newBarChartSeriesData.unassigned },
      ],
    });
  }, [filterState]);

  return {
    filterState,
    setFilterState,
    mapChartOptions,
    barChartOptions,
    setMapChartOptions,
    setBarChartOptions,
  };
};

const InsuredByDefinitionAndByAgeGroup = function InsuredByDefinitionAndByAgeGroup() {
  const [init, setInit] = useState(false);
  const { filterState, setFilterState, mapChartOptions, barChartOptions } = useCharts(
    DEFAULTS,
    { map: mapOptions, chart: secondChartOptions },
    init,
  );

  const mapRef = useRef(null);
  const chartRef = useRef(null);

  const onFilterChange = e => {
    const { name, value } = e.target;
    const newValue = name === 'year' ? Number(value) : value;
    setFilterState({ ...filterState, [name]: newValue });
  };

  useEffect(() => {
    setInit(true);
  }, []);

  const { assignedTotalsCurrent, trendAssigned, trendUnassigned } = useMemo(
    () => calculateAssignedTypesTotals(filterState),
    [filterState],
  );

  return (
    <Card
      style={{
        display: 'grid',
        gridTemplateAreas: '"header header" "filters scorecards" "map chart"',
      }}
    >
      <CardHeader style={{ gridArea: 'header' }}>
        <CardTitle>{mapRef.current?.chart?.options.title.text}</CardTitle>
      </CardHeader>
      <CardContent style={{ gridArea: 'filters' }}>
        <FilterForm
          filterState={filterState}
          onChange={onFilterChange}
          filterOptions={{
            municipalities: MUNICIPALITIES,
            years: YEARS,
            ageGroups: AGE_GROUPS,
            doctorTypes: DOCTOR_TYPES,
            assignedTypes: ASSIGNED_TYPES,
            contractTypes: CONTRACT_TYPES,
          }}
        />
      </CardContent>

      <CardContent style={{ display: 'flex', gap: '0.5em' }}>
        <Scorecard
          valueLabel="izbrano leto"
          changeLabel="prejšnje leto"
          scorecardType="description"
        />
        <Scorecard
          label="Opredeljeni"
          value={assignedTotalsCurrent.assigned}
          change={trendAssigned}
        />
        <Scorecard
          label="Neopredeljeni"
          value={assignedTotalsCurrent.unassigned}
          change={trendUnassigned}
        />
      </CardContent>
      <CardContent style={{ gridArea: 'map' }}>
        <figure>
          <HighchartsReact
            ref={mapRef}
            highcharts={HighMaps}
            constructorType="mapChart"
            options={mapChartOptions}
          />
        </figure>
      </CardContent>
      <CardContent style={{ gridArea: 'chart' }}>
        <CardTitle variant="subtitle">{filterState.municipality}</CardTitle>
        <div style={{ display: 'flex', gap: '0.5em', flexWrap: 'wrap' }}>
          <CardTitle as="span" variant="description">
            Skupina: {filterState.ageGroup}
          </CardTitle>
          <CardTitle as="span" variant="description">
            Status: {CONTRACT_TYPES_MAP[filterState.contractType]}
          </CardTitle>
          <CardTitle as="span" variant="description">
            Zdravnik: {DOCTOR_TYPES_MAP[filterState.doctorType]}
          </CardTitle>
        </div>
        <figure>
          <HighchartsReact ref={chartRef} highcharts={Highcharts} options={barChartOptions} />
        </figure>
      </CardContent>
    </Card>
  );
};

export default InsuredByDefinitionAndByAgeGroup;
