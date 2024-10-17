import PropTypes from 'prop-types';
import loMerge from 'lodash/merge';

import ChartCard from '../../ChartCard';
import { commonOptions } from '../../HighchartsOptions/options';

/**
 * @typedef {import('highcharts').Options} HighchartsOptions
 */

/**
 * @constant {HighchartsOptions} lineChartOptions- Highcharts options object.
 */
export const lineChartOptions = {
  ...loMerge(
    {
      chart: { type: 'line' },
      title: { text: 'Line' },
      subtitle: { text: 'Line Subtitle' },
      caption: { text: 'Line Caption' },
      legend: { enabled: false },
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
    },
    { ...commonOptions },
  ),
};

const LineChartExample = function LineChartExample({ id }) {
  return <ChartCard id={id} options={lineChartOptions} />;
};

LineChartExample.propTypes = {
  id: PropTypes.string.isRequired,
};

export default LineChartExample;
