import loMerge from 'lodash/merge';
import PropTypes from 'prop-types';

import ChartCard from '../../ChartCard';
import { commonOptions } from '../options';

/**
 * @typedef {import('highcharts').Options} HighchartsOptions
 */

/**
 * @constant {HighchartsOptions} columnChartOptions- Highcharts options object.
 */
export const columnChartOptions = {
  ...loMerge(
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

const ColumnChartExample = function ColumnChartExample({ id }) {
  return <ChartCard id={id} options={columnChartOptions} />;
};
ColumnChartExample.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ColumnChartExample;
