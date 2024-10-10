import ChartCard from './Charts/ChartCard';
import { chartEvents, commonOptions, titleOptions } from './Charts/options';

/**
 * @typedef {import('highcharts').Options} HighchartsOptions
 */

/**
 * @constant {HighchartsOptions} columnChartOptions- Highcharts options object.
 */
export const columnChartOptions = {
  ...commonOptions,
  legend: {
    enabled: false,
    useHTML: true,
  },
  chart: {
    type: 'column',
    events: { ...chartEvents },
  },
  title: {
    text: 'Column',
    ...titleOptions,
  },
  subtitle: {
    text: 'Subtitle',
    ...titleOptions,
  },
  caption: {
    text: 'Caption',
    ...titleOptions,
  },
  series: [
    {
      data: [1, 2, 3],
      name: 'Series 1',
    },
    { data: [3, 2, 1], name: 'Series 2' },
    { data: [3, 2, 1], name: 'Series 3' },
    { data: [3, 2, 1], name: 'Series 4' },
    { data: [3, 2, 1], name: 'Series 5' },
    { data: [3, 2, 1], name: 'Series 6' },
  ],
  yAxis: {
    title: {
      text: 'Y os',
    },
  },
};

const ColumnChartExample = function ColumnChartExample() {
  return <ChartCard id="line-chart" options={columnChartOptions} />;
};

export default ColumnChartExample;
