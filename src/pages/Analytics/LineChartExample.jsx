import ChartCard from './Charts/ChartCard';
import { chartEvents, commonOptions, titleOptions } from './Charts/options';

/**
 * @typedef {import('highcharts').Options} HighchartsOptions
 */

/**
 * @constant {HighchartsOptions} lineChartOptions- Highcharts options object.
 */
export const lineChartOptions = {
  ...commonOptions,
  legend: {
    enabled: false,
    useHTML: true,
  },
  chart: {
    type: 'line',
    events: { ...chartEvents },
  },
  title: {
    text: 'Line',
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
      name: 'Prvi',
    },
    { data: [3, 2, 1], name: 'Drugi' },
  ],
  yAxis: {
    title: {
      text: 'Y os',
    },
  },
};

const LineChartExample = function LineChartExample() {
  return <ChartCard id="line-chart" options={lineChartOptions} />;
};

export default LineChartExample;
