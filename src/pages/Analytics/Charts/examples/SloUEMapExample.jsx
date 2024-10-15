import loMerge from 'lodash/merge';
import PropTypes from 'prop-types';

import sloUEMap from 'assets/maps/UE.geo.json';

// import theme from 'const/theme';
import MapCard from '../../MapCard';
import { commonOptions } from '../../HighchartsOptions/options';

/**
 * @typedef {import('highcharts/highmaps').Options} HighMapsOptions
 */

/**
 * @constant {HighMapsOptions} SloUEMapOptions- Highcharts options object.
 */
export const SloUEMapOptions = {
  ...loMerge(
    { ...commonOptions },
    {
      chart: { map: sloUEMap },
      title: { text: 'Slo UE Map' },
      subtitle: { text: 'Slo UE Subtitle' },
      caption: { text: 'Slo UE Caption' },
      legend: {
        enabled: true,
        align: 'right',
        verticalAlign: 'bottom',
        layout: 'vertical',
        floating: true,
        useHTML: true,
      },
      colorAxis: {
        startOnTick: false,
        endOnTick: false,
        type: 'logarithmic',
      },
      tooltip: {
        useHtml: true,
        pointFormat: '{point.properties.UE_UIME}: <b>{point.value}</b',
      },
      responsive: {
        rules: [
          {
            condition: {
              minWidth: 670,
            },
            chartOptions: {
              chart: {
                height: `${(9 / 16) * 100}%`, // 16:9 ratio,
              },
            },
          },
          {
            condition: {
              maxWidth: 670,
            },
            chartOptions: {
              chart: {
                height: 400, // 16:9 ratio,
              },
            },
          },
        ],
      },
    },
  ),
  series: [
    {
      type: 'map',
      name: 'Slo UE Data',
      mapData: sloUEMap,
      keys: ['UE_MID', 'value'],
      joinBy: 'UE_MID',
      data: [
        [10051851, 10],
        [10051860, 20],
        [10051878, 30],
        [10051886, 35],
        [10051894, 25],
      ],
      dataLabels: {
        enabled: true,
        format: '{point.properties.UE_UIME}',
      },
    },
  ],
};

const SloUEMapExample = function SloUEMapExample({ id }) {
  return <MapCard id={id} options={SloUEMapOptions} />;
};

SloUEMapExample.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SloUEMapExample;
