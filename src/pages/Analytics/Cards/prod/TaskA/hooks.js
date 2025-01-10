/** @import * as Types "../../../types" */
/** @import * as TaskATypes from "./types" */

import { useEffect, useState } from 'react';

/**
 *
 *
 * @param {TaskATypes.UserInputsValues} initialFilterState
 * @param {{map: Types.HighMapsOptions, chart: Types.HighchartsOptions}} options
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

  return {
    filterState,
    mapChartOptions,
    setFilterState,
    setMapChartOptions,
    chartOptions,
    setChartOptions,
  };
};
