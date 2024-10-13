import { merge as _merge } from 'lodash';

import ChartCard from './Charts/ChartCard';
import { commonOptions } from './Charts/options';

/**
 * @typedef {import('highcharts').Options} HighchartsOptions
 */

/**
 * @constant {HighchartsOptions} lineChartOptions- Highcharts options object.
 */
export const lineChartOptions = {
  ..._merge(
    {
      chart: { type: 'line' },
      title: { text: 'Line' },
      subtitle: { text: 'Subtitle' },
      caption: { text: 'Caption' },
    },
    commonOptions,
  ),
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
  return <ChartCard options={lineChartOptions} />;
};

export default LineChartExample;