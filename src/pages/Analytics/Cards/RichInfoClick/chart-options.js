/* eslint-disable no-plusplus */
/** @import * as Types from "../../types"  */

import sloOBMap from 'assets/maps/OB.geo.json';
import { fakeData } from 'pages/Analytics/data-lower-case/fake-data';

import { dimensions } from '../../highcharts-options/options';

/**
 * @typedef {Object} DataItem
 * @property {string} name
 * @property {number} value
 * @property {string} OB_UIME
 * @property {number} year
 */

/**
 * @typedef {Object} SeriesDataItem
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} SeriesItem
 * @property {string} id
 * @property {string} name
 * @property {SeriesDataItem[]} data
 */

/**
 * @description Transforms the data into a format that Highcharts can understand.
 * @function
 * @param {DataItem[]} data - The data to transform.
 * @returns {SeriesItem[]}
 */
const transformData = data => {
  // Initialize an empty object to accumulate the transformed data
  const result = data.reduce((acc, item) => {
    // If the accumulator doesn't have an entry for the current item's name, create one
    if (!acc[item.name]) {
      acc[item.name] = [];
    }
    // Push the current item's year and value as an object into the corresponding name's array
    acc[item.name].push({ x: item.year, y: item.value });
    return acc;
  }, {});

  // Convert the accumulated object into an array of objects with name and data properties
  return Object.keys(result).map(key => ({
    id: key,
    name: key,
    data: result[key],
  }));
};

/**
 * @type {DataItem[]}
 */
export const firstChartSeriesMap = fakeData.reduce((acc, item) => {
  if (!acc.has(item.year)) {
    acc.set(item.year, []);
  }
  acc.get(item.year).push(item);
  return acc;
}, new Map());

export const yearsSortedDesc = Array.from(firstChartSeriesMap.keys())
  .filter(v => !Number.isNaN(v))
  .sort((a, b) => b - a);

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
    spacing: 1,
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom',
      x: 10,
    },
  },
  legend: {
    enabled: true,
    align: 'right',
    verticalAlign: 'bottom',
    layout: 'vertical',
    floating: true,
    useHTML: true,
    padding: 12,
  },
  title: {
    text: 'Neki po občinah',
  },
  subtitle: {
    text: 'Klikni na občino za dodatne informacije',
  },
  tooltip: {
    footerFormat: '<span style="font-size: 10px">(Click for details)</span>',
  },
  colorAxis: {
    minColor: '#AAE8F8',
    maxColor: '#095568',
    startOnTick: true,
    endOnTick: true,
    // type: 'logarithmic', can not use logarithmic scale with negative values and 0; use linear scale instead
  },
  responsive: {
    rules: [
      {
        condition: {
          minWidth: dimensions.breakpoints.sm,
        },
        chartOptions: {
          chart: {
            height: dimensions.height.md,
          },
        },
      },
      {
        condition: {
          maxWidth: dimensions.breakpoints.sm,
        },
        chartOptions: {
          chart: {
            height: dimensions.height.sm,
          },
          legend: {
            enabled: true,
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
            floating: false,
            useHTML: true,
          },
        },
      },
    ],
  },
  series: [
    {
      type: 'map',
      name: 'Slo OB Data',
      mapData: sloOBMap,
      keys: ['OB_UIME', 'value'],
      joinBy: ['OB_UIME', 'name'],
      data: firstChartSeriesMap.get(yearsSortedDesc[0]),
      allowPointSelect: true,
      cursor: 'pointer',
      states: {
        select: {
          color: '#95C83F',
          borderColor: 'black',
          dashStyle: 'shortdot',
        },
      },
      borderWidth: 0.5,
      dataLabels: {
        enabled: true,
        format: '{point.properties.OB_UIME}',
        style: {
          textOutline: 'none',
        },
      },
    },
  ],
};

const secondChartSeries = transformData(fakeData);
export const secondChartSeriesDataMap = new Map(secondChartSeries.map(item => [item.name, item]));

/** @type {Types.HighchartsOptions} */
export const baseSecondChartOptions = {
  chart: {
    type: 'area',
  },
  credits: {
    enabled: false,
  },
  legend: { enabled: false },
  tooltip: {
    split: false,
    shared: true,
    useHTML: true,
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
  },

  series: [],
};
