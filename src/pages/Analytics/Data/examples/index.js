/** @import * as Types from "../../types" */

import loMerge from 'lodash/merge';

import sloUEMap from 'assets/maps/UE.geo.json';
import { commonOptions } from 'pages/Analytics/HighchartsOptions/options';

/**
 * Creates a proxy object for handling chart data operations.
 * The proxy intercepts property access to provide custom functionality:
 * - If the property is 'id', returns a formatted version of the chart title.
 * - If the property is 'mergedOptions', returns the merged options of the target and common options.
 * @param {(Types.ChartData | Types.MapData)} obj - The target object to proxy.
 * @returns {Proxy} - A new Proxy instance for the target object with custom property access behavior.
 */
export function createChartDataProxy(obj) {
  const handler = {
    get(target, prop, _receiver) {
      if (prop === 'id') {
        return encodeURIComponent(
          target.options.title.text.trim().toLowerCase().replace(/\s/g, '-'),
        );
      }
      if (prop === 'mergedOptions') {
        return loMerge(target.options, commonOptions);
      }
      // eslint-disable-next-line prefer-rest-params
      return Reflect.get(...arguments);
    },
  };
  return new Proxy(obj, handler);
}

/**
 * @type {Types.ChartData} - Column chart data.
 */
export const COLUMN = {
  section: 'examples 1',
  order: 1,
  componentName: 'ChartCard',
  options: {
    accessibility: {
      typeDescription: 'Column chart with 6 series.',
    },

    chart: { type: 'column' },
    title: { text: 'Column' },
    subtitle: { text: 'Column Subtitle' },
    caption: { text: 'Column Caption' },
    legend: { enabled: false },
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
  },
};

/**
 * @type {Types.ChartData} - Line chart data.
 */
export const Line = {
  section: 'examples 2',
  order: 2,
  componentName: 'ChartCard',
  options: {
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
};

/**
 * @type {Types.ChartData} - Drilldown chart data.
 */
export const DRILLDOWN = {
  section: 'examples 2',
  order: 3,
  componentName: 'ChartCard',
  options: {
    chart: { type: 'column' },
    title: { text: 'Drilldown' },
    subtitle: { text: 'Click the slices to view versions.' },
    caption: { text: 'Caption' },
    legend: { enabled: false },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: 'Total percent market share',
      },
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}%',
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: ' +
        '<b>{point.y:.2f}%</b> of total<br/>',
    },
    series: [
      {
        showInLegend: false,
        name: 'Browsers',
        colorByPoint: true,
        data: [
          {
            name: 'Chrome',
            y: 63.06,
            drilldown: 'Chrome',
          },
          {
            name: 'Safari',
            y: 19.84,
            drilldown: 'Safari',
          },
          {
            name: 'Firefox',
            y: 4.18,
            drilldown: 'Firefox',
          },
          {
            name: 'Edge',
            y: 4.12,
            drilldown: 'Edge',
          },
          {
            name: 'Opera',
            y: 2.33,
            drilldown: 'Opera',
          },
          {
            name: 'Internet Explorer',
            y: 0.45,
            drilldown: 'Internet Explorer',
          },
          {
            name: 'Other',
            y: 1.582,
            drilldown: null,
          },
        ],
      },
    ],
    drilldown: {
      breadcrumbs: {
        position: {
          align: 'right',
        },
      },
      series: [
        {
          name: 'Chrome',
          id: 'Chrome',
          data: [
            ['v65.0', 0.1],
            ['v64.0', 1.3],
            ['v63.0', 53.02],
            ['v62.0', 1.4],
            ['v61.0', 0.88],
            ['v60.0', 0.56],
            ['v59.0', 0.45],
            ['v58.0', 0.49],
            ['v57.0', 0.32],
            ['v56.0', 0.29],
            ['v55.0', 0.79],
            ['v54.0', 0.18],
            ['v51.0', 0.13],
            ['v49.0', 2.16],
            ['v48.0', 0.13],
            ['v47.0', 0.11],
            ['v43.0', 0.17],
            ['v29.0', 0.26],
          ],
        },
        {
          name: 'Firefox',
          id: 'Firefox',
          data: [
            ['v58.0', 1.02],
            ['v57.0', 7.36],
            ['v56.0', 0.35],
            ['v55.0', 0.11],
            ['v54.0', 0.1],
            ['v52.0', 0.95],
            ['v51.0', 0.15],
            ['v50.0', 0.1],
            ['v48.0', 0.31],
            ['v47.0', 0.12],
          ],
        },
        {
          name: 'Internet Explorer',
          id: 'Internet Explorer',
          data: [
            ['v11.0', 6.2],
            ['v10.0', 0.29],
            ['v9.0', 0.27],
            ['v8.0', 0.47],
          ],
        },
        {
          name: 'Safari',
          id: 'Safari',
          data: [
            ['v11.0', 3.39],
            ['v10.1', 0.96],
            ['v10.0', 0.36],
            ['v9.1', 0.54],
            ['v9.0', 0.13],
            ['v5.1', 0.2],
          ],
        },
        {
          name: 'Edge',
          id: 'Edge',
          data: [
            ['v16', 2.6],
            ['v15', 0.92],
            ['v14', 0.4],
            ['v13', 0.1],
          ],
        },
        {
          name: 'Opera',
          id: 'Opera',
          data: [
            ['v50.0', 0.96],
            ['v49.0', 0.82],
            ['v12.1', 0.14],
          ],
        },
      ],
    },
  },
};

/**
 * @type {Types.MapData} - Slo UE map data.
 */
export const SLO_UE_MAP = {
  order: 4,
  section: 'examples 1',
  componentName: 'MapCard',
  options: {
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
      pointFormat: '{point.properties.UE_UIME}: <b>{point.value}</b>',
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
  },
};

export default {
  COLUMN,
  Line,
  DRILLDOWN,
  SLO_UE_MAP,
};
