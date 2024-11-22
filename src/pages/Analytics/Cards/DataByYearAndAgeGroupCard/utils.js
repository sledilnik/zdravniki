import Highcharts from 'highcharts';
import { YEARS } from './chartOptions';

export function renderChart(point) {
  Highcharts.chart('hc-tooltip-with-chart', {
    chart: {
      type: 'column',
      height: 270,
    },

    xAxis: {
      categories: YEARS,
      title: {
        text: null,
      },
    },
    yAxis: {
      title: { text: null },
    },

    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        data: point.options.tooltipData,
        dataLabels: {
          enabled: true,
        },
        title: null,
        color: '#5DA9B5',
      },
    ],
  });
}
