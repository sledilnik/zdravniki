/** @import * as Types from "./types" */

import { useEffect, useState } from 'react';
import { prepareDetailLineChartSeries, prepareOverviewMapSeriesData } from './data';

/**
 *
 * @param {Types.UserInputsValues} initialFilterState
 * @param {{map: HighMaps.Options, chart: Highcharts.Options}} options
 * @param {boolean} init
 * @param {Highcharts.Chart} mapChart
 * @returns
 */
export const useCharts = (initialFilterState, options, init, mapChart) => {
  const [filterState, setFilterState] = useState(initialFilterState);
  const [mapChartOptions, setMapChartOptions] = useState(options.map);
  const [chartOptions, setChartOptions] = useState(options.chart);
  useEffect(() => {
    if (!init) return;
    setMapChartOptions({
      plotOptions: {
        series: {
          point: {
            events: {
              select() {
                const sPoints = mapChart?.getSelectedPoints();
                setFilterState(prev => ({
                  ...prev,
                  municipalities: sPoints.map(p => p.municipality),
                }));
              },
              unselect() {
                const sPoints = mapChart?.getSelectedPoints();
                setFilterState(prev => ({
                  ...prev,
                  municipalities: sPoints.map(p => p.municipality),
                }));
              },
            },
          },
        },
      },
    });
  }, [init, mapChart]);

  useEffect(() => {
    const data = prepareOverviewMapSeriesData(filterState);
    setMapChartOptions({
      series: [{ data }],
    });

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
  };
};
