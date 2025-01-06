import { useEffect, useState } from 'react';
import { prepareDetailLineChartSeries, prepareOverviewMapSeriesData } from './data';

/**
 *
 * @param {Types.UserInputsValues} initialFilterState
 * @param {{map: HighMaps.Options, chart: Highcharts.Options}} options
 * @param {boolean} init
 * @returns
 */
export const useCharts = (initialFilterState, options, init) => {
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
