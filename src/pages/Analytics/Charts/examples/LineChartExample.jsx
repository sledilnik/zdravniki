import PropTypes from 'prop-types';
import { merge as _merge } from 'lodash';

import ChartCard from '../../ChartCard';
import { commonOptions } from '../options';

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

const LineChartExample = function LineChartExample({ id }) {
  return <ChartCard id={id} options={lineChartOptions} />;
};

LineChartExample.propTypes = {
  id: PropTypes.string.isRequired,
};

export default LineChartExample;
