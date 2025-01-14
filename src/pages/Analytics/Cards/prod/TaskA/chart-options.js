/** @import * as Types from "../../../types" */

import { renderToString } from 'react-dom/server';

import { sloOBMap } from 'pages/Analytics/data/geo-json-maps';
import { uniqueOverviewYearsSet } from './constants';
import { prepareDetailLineChartSeries } from './detail-data-util';
import { LineChartTooltip, LineChartYAxisTitle } from './LineChartComponents';
import { MapChartTooltip } from './MapChartTooltip';
import { prepareOverviewMapSeriesData } from './overview-data-util';

export const COLORS = Object.freeze({
  minColor: '#E57373',
  maxColor: '#D8E8D8',
  selectColor: '#f8a808',
  selectBorderColor: '#000000',
  backgroundColor: 'oklch(0.98 0 0)',
  tooltipBackgroundColor: 'oklch(1 0 0 / 0.8)',
});

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
    height: 400,
    backgroundColor: COLORS.backgroundColor,
  },
  legend: {
    enabled: false,
  },
  colorAxis: {
    minColor: COLORS.minColor,
    maxColor: COLORS.maxColor,
    startOnTick: true,
    endOnTick: true,
  },
  tooltip: {
    useHTML: true,
    headerFormat: '',
    backgroundColor: COLORS.tooltipBackgroundColor,
    formatter() {
      return renderToString(<MapChartTooltip point={this.point} />);
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
          color: COLORS.selectColor,
          borderColor: COLORS.selectBorderColor,
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
    backgroundColor: COLORS.backgroundColor,
  },
  xAxis: {
    categories: [...uniqueOverviewYearsSet].sort((a, b) => a - b),
    crosshair: true,
  },
  yAxis: {
    useHTML: true,
    title: {
      text: renderToString(<LineChartYAxisTitle />),
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
    backgroundColor: COLORS.tooltipBackgroundColor,
    formatter() {
      return renderToString(<LineChartTooltip points={this.points} x={this.x} />);
    },
  },
};
