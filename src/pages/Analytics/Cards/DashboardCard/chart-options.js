/** @import * as Types from "../../types" */

import { sloOBMap } from 'assets/maps/OB.geo.json';

// import { dimensions } from 'pages/Analytics/HighchartsOptions/options';

import { byAgeGroupMap, DATA } from 'pages/Analytics/data/data';

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
    height: 400,
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
    headerFormat: '',
  },
  credits: {
    enabled: false,
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
  responsive: {},
};
/** @type {Types.HighchartsOptions} */
export const baseSecondChartOptions = {
  chart: {
    type: 'line',
    height: 200,
  },
  credits: {
    enabled: false,
  },
  legend: { enabled: false },
  tooltip: {
    split: false,
    shared: true,
    useHTML: true,
    format: '<b>{point.name}</b><br>{point.ageGroup}:{point.y}',
  },
  plotOptions: {
    series: {
      events: {},
    },
  },

  xAxis: {
    minTickInterval: 1,
    tickPixelInterval: 50,
    crosshair: true,
    categories: DATA.YEARS,
  },
  yAxis: {
    title: {
      text: null,
    },
  },
  series: [],
};
