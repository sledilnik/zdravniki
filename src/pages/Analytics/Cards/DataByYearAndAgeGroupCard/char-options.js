/** @import * as Types from "../../types"  */

import sloOBMap from 'assets/maps/OB.geo.json';
import { dimensions } from 'pages/Analytics/highcharts-options/options';

import { byAgeGroupMap, DATA } from 'pages/Analytics/data/fake-data';

import { chartSeriesDataMap } from './utils';

const { MUNICIPALITIES, YEARS, defaults } = DATA;

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
  },
  title: {
    text: 'Neki po letih in starostnih skupinah',
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
  colorAxis: {
    minColor: '#AAE8F8',
    maxColor: '#095568',
    startOnTick: true,
    endOnTick: true,
  },
  tooltip: {
    useHTML: true,
    headerFormat: '',
    // className: 'hc-tooltip-with-chart',
    pointFormat:
      '<div style="min-height: 300px; min-width: 300px;"><span style="font-size: 1rem;"><b>{point.name}</b></span><br><span>Skupina: <b>{point.ageGroup}</b></span><span style="margin-left: 0.5em;">Leto: <b>{point.year}</b><div id="hc-tooltip-with-chart"></div></div',
  },

  series: [
    {
      type: 'map',
      mapData: sloOBMap,
      keys: ['OB_UIME', 'value'],
      joinBy: ['OB_UIME', 'name'],
      data: byAgeGroupMap
        .get('0-17')
        .filter(item => item.year === defaults.year)
        .map(item => {
          const tooltipData = byAgeGroupMap
            .get(item.ageGroup)
            .filter(i => i.name === item.name)
            .map(i => i.value);
          return { ...item, tooltipData };
        }),
    },
  ],
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
};

/** @type {Types.HighChartsOptions} */
export const chartOptions = {
  chart: {
    type: 'heatmap',
    height: 800,
    zoomType: 'xy',
  },
  title: {
    text: 'Municipality Data Heatmap',
  },
  xAxis: {
    categories: MUNICIPALITIES,
    events: {
      afterSetExtremes(e) {
        const { max, min, dataMax, dataMin } = e;
        const disabled = max === dataMax && min === dataMin;
        this.chart.update({ plotOptions: { series: { dataLabels: { enabled: !disabled } } } });
      },
    },
  },
  yAxis: {
    categories: YEARS,
    title: null,
  },
  colorAxis: {
    min: 0,
    minColor: '#AAE8F8',
    maxColor: '#095568',
    minorTickInterval: 0.1,
    minorTicks: true,
    minorTickLength: 0,
    tickInterval: 1,
  },
  plotOptions: {
    series: { dataLabels: { enabled: false } },
  },

  tooltip: {
    formatter() {
      const { point, series } = this;
      const xCategory = series.xAxis.categories[point.x];
      // const yCategory = series.yAxis.categories[point.y];
      const data = series.data.map(p => `${p.year}: ${p.value}`).join('<br>');
      return `<b>${xCategory}</b><br><b>Starostna skupina: ${point.ageGroup}</b><br>${data}`;
    },
  },
  series: Array.from(chartSeriesDataMap.values()),
};
