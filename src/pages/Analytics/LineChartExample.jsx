import ChartCard from './Charts/ChartCard';

/**
 * @typedef {import('highcharts').Options} HighchartsOptions
 */

/**
 * @constant {HighchartsOptions} lineChartOptions- Highcharts options object.
 */
export const lineChartOptions = {
  legend: {
    enabled: false,
  },
  chart: {
    type: 'line',
  },
  title: {
    text: 'Line',
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
      name: 'Prvi',
    },
    { data: [3, 2, 1], name: 'Drugi' },
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

const LineChartExample = function LineChartExample() {
  return <ChartCard id="line-chart" options={lineChartOptions} />;
};

export default LineChartExample;
