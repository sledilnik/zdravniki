import ChartCard from './Charts/ChartCard';

/**
 * @typedef {import('highcharts').Options} HighchartsOptions
 */

/**
 * @constant {HighchartsOptions} columnChartOptions- Highcharts options object.
 */
export const columnChartOptions = {
  legend: {
    enabled: false,
  },
  chart: {
    type: 'column',
  },
  title: {
    text: 'Column',
    style: {
      display: 'none',
    },
  },
  subtitle: {
    text: 'Subtitle',
    style: {
      display: 'none',
    },
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
  caption: {
    text: 'Caption',
    style: {
      display: 'none',
    },
  },
};

const ColumnChartExample = function ColumnChartExample() {
  return <ChartCard id="line-chart" options={columnChartOptions} />;
};

export default ColumnChartExample;
