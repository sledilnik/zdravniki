import { merge as _merge } from 'lodash';

import ChartCard from './Charts/ChartCard';
import { commonOptions } from './Charts/options';

/**
 * @typedef {import('highcharts').Options} HighchartsOptions
 */

/**
 * @constant {HighchartsOptions} columnChartOptions- Highcharts options object.
 */
export const columnChartOptions = {
  ..._merge(
    {
      chart: { type: 'column' },
      title: { text: 'Column' },
      subtitle: { text: 'Subtitle' },
      caption: { text: 'Caption' },
    },
    commonOptions,
  ),
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
  return <ChartCard options={columnChartOptions} />;
};

export default ColumnChartExample;
