import sloOBMap from 'assets/maps/OB.geo.json';

// import { dimensions } from 'pages/Analytics/HighchartsOptions/options';

import { byAgeGroupMap, DATA } from '../DataByYearAndAgeGroupCard/data';

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
  },
  title: {
    text: 'Neki Kristof',
  },

  legend: {
    enabled: false,
  },
  colorAxis: {
    minColor: '#AAE8F8',
    maxColor: '#095568',
    startOnTick: true,
    endOnTick: true,
  },
  tooltip: {
    useHTML: true,
  },

  series: [
    {
      type: 'map',
      mapData: sloOBMap,
      keys: ['OB_UIME', 'value'],
      joinBy: ['OB_UIME', 'name'],
      data: byAgeGroupMap
        .get('0-17')
        .filter(item => item.year === DATA.defaults.year)
        .map(item => {
          const tooltipData = byAgeGroupMap
            .get(item.ageGroup)
            .filter(i => i.name === item.name)
            .map(i => i.value);
          return { ...item, tooltipData };
        }),
    },
  ],
};
