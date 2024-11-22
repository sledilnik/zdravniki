/** @import * as Types from "../../types"  */

import sloOBMap from 'assets/maps/OB.geo.json';
import { dimensions } from 'pages/Analytics/HighchartsOptions/options';

import { fakeData } from './data';

export const MUNICIPALITIES = [...new Set(fakeData.map(item => item.name))];
export const YEARS = [...new Set(fakeData.map(item => item.year))];
export const AGE_GROUPS = [...new Set(fakeData.map(item => item.ageGroup))];

/**
 * @type {Map<import('./data').AgeGroup, Types.AgeGroupItem[]>}
 */
export const byAgeGroupMap = new Map(
  [...AGE_GROUPS].map(ageGroup => [ageGroup, fakeData.filter(item => item.ageGroup === ageGroup)]),
);

export function createChartData(years, municipalities, items) {
  return items.map(item => {
    const x = municipalities.indexOf(item.name);
    const y = years.indexOf(item.year);
    if (x === -1 || y === -1) {
      return null;
    }

    return {
      x,
      y,
      name: item.name,
      value: item.value,
      ageGroup: item.ageGroup,
      year: item.year,
    };
  });
}

const municipalitiesExample = [...MUNICIPALITIES];
const yearsExample = [...YEARS];
const dataExample = createChartData(
  yearsExample,
  municipalitiesExample,
  byAgeGroupMap.get('0-17'),
).filter(item => item != null);

export function createSeriesDataMap(data) {
  const seriesMap = new Map();
  // loop through the data and create a map of series data
  // if key exists, add to the existing array
  // if key does not exist, create a new array
  data.forEach(item => {
    if (seriesMap.has(item.name)) {
      const serie = seriesMap.get(item.name);
      serie.data.push(item);
      seriesMap.set(item.name, serie);
      return;
    }
    seriesMap.set(item.name, {
      name: item.name,
      borderWidth: 0,
      data: [item],
    });
  });
  return seriesMap;
}

fakeData
  .filter(item => item.year === [...YEARS][0] && item.ageGroup === [...AGE_GROUPS][0])
  .map(item => {
    const tooltipData = byAgeGroupMap
      .get(item.ageGroup)
      .filter(i => i.name === item.name)
      .map(i => i.value);
    return { ...item, tooltipData };
  });

export const seriesDataMap = createSeriesDataMap(dataExample);

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
    className: 'hc-tooltip-with-chart',
    pointFormat:
      '<div style="min-height: 300px; min-width: 300px;"><span style="font-size: 1rem;"><b>{point.name}</b></span><br><span>Skupina: {point.ageGroup}</span><div id="hc-tooltip-with-chart"></div></div',
  },

  series: [
    {
      type: 'map',
      mapData: sloOBMap,
      keys: ['OB_UIME', 'value'],
      joinBy: ['OB_UIME', 'name'],
      data: byAgeGroupMap
        .get('0-17')
        .filter(item => item.year === YEARS[0])
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
    categories: municipalitiesExample,
    events: {
      afterSetExtremes(e) {
        const { max, min, dataMax, dataMin } = e;
        const disabled = max === dataMax && min === dataMin;
        this.chart.update({ plotOptions: { series: { dataLabels: { enabled: !disabled } } } });
      },
    },
  },
  yAxis: {
    categories: yearsExample,
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
  series: Array.from(seriesDataMap.values()),
};
