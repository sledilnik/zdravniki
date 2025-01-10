/** @import * as Types from "../../../types" */

import { sloOBMap } from 'pages/Analytics/data/geo-json-maps';
import { uniqueOverviewYearsSet } from './constants';
import { prepareDetailLineChartSeries } from './detail-data-util';
import { prepareOverviewMapSeriesData } from './overview-data-util';

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
    height: 400,
    backgroundColor: 'oklch(0.98 0 0)',
  },
  legend: {
    enabled: false,
  },
  colorAxis: {
    minColor: '#E57373',
    maxColor: '#81C784',
    startOnTick: true,
    endOnTick: true,
  },
  tooltip: {
    useHTML: true,
    headerFormat: '',
    formatter() {
      return `
        <b>${this.point.name}</b><br>
        <b>${this.point.year}</b><br>
        <b>doctorType:</b> ${this.point.doctorType}<br>
        <b>iozRatio:</b> ${this.point.iozRatio}<br>
        <b>insuredPeopleCount:</b> ${this.point.insuredPeopleCount}<br>
        <b>insuredPeopleCountWithIOZ:</b> ${this.point.insuredPeopleCountWithIOZ}<br>
      `;
    },
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      id: 'municipalities',
      type: 'map',
      mapData: sloOBMap,
      joinBy: ['name', 'municipality'],
      data: prepareOverviewMapSeriesData(),
      cursor: 'pointer',
      allowPointSelect: true,
      states: {
        select: {
          color: '#ffa500',
          borderColor: '#000000',
        },
      },
      borderWidth: 0.5,
    },
  ],
};

/** @type {Types.HighchartsOptions} */
export const secondChartOptions = {
  chart: {
    type: 'line',
    height: 400,
    backgroundColor: 'oklch(0.98 0 0)',
  },
  xAxis: {
    categories: [...uniqueOverviewYearsSet].sort((a, b) => a - b),
    crosshair: true,
  },
  yAxis: {
    title: {
      text: 'neki',
    },
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  series: prepareDetailLineChartSeries(),
  tooltip: {
    shared: true,
    useHTML: true,
    formatter() {
      const header = `
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border: 1px solid black; padding: 4px;">Age Group</th>
              <th style="border: 1px solid black; padding: 4px;">Total Insured</th>
              <th style="border: 1px solid black; padding: 4px;">With IOZ</th>
            </tr>
          </thead>
          <tbody>
      `;

      const rows = this.points
        .map(point => {
          const { options } = point.point;
          const intlFormat = new Intl.NumberFormat('sl');
          const totalInsured = intlFormat.format(options.insuredPeopleCount);
          const insuredWithIOZ = intlFormat.format(options.insuredPeopleCountWithIOZ);
          return `
            <tr>
              <td style="border: 1px solid black; padding: 4px;">${point.series.name}</td>
              <td style="border: 1px solid black; padding: 4px;">${totalInsured}</td>
              <td style="border: 1px solid black; padding: 4px;">${insuredWithIOZ}</td>
            </tr>
          `;
        })
        .join('');

      const footer = `</tbody></table>`;

      return `<b>Year</b>: ${this.x}<br/>${header}${rows}${footer}`;
    },
  },
};
