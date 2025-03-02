/** @import * as Types from "../../types" */

import { renderToString } from 'react-dom/server';

import { CHART_COLORS } from 'pages/Analytics/constants';
import { sloOBMap } from 'pages/Analytics/data/geo-json-maps';

import { MapChartTooltip } from './MapChartTooltip';
import { prepareOverviewMapSeriesData } from './overview-data-util';

export const COLORS = Object.freeze({
  minColor: 'rgba(220,53,69,1)',
  maxColor: 'rgba(64,210,98,1)',
  selectColor: 'rgba(198,190,29,1)',
  border: {
    select: 'rgba(178,171,26,1)',
  },
  outerShadow: 'rgba(133,127,0,0.47)',
});

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
    height: 600,
    backgroundColor: CHART_COLORS.chart.backgroundColor,
  },
  legend: {
    enabled: true,
  },
  colorAxis: {
    minColor: COLORS.minColor,
    maxColor: COLORS.maxColor,
    type: 'linear',
    startOnTick: true,
    endOnTick: true,
  },
  tooltip: {
    useHTML: true,
    headerFormat: '',
    backgroundColor: CHART_COLORS.tooltip.backgroundColor,
    padding: 0,
    style: {
      zIndex: 9000,
    },
    formatter() {
      return renderToString(<MapChartTooltip point={this.point} />);
    },
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
          borderColor: COLORS.border.select,
        },
      },
      borderWidth: 0.5,
    },
  ],
  accessibility: {
    screenReaderSection: {
      beforeChartFormat: '<h4>{chartSubtitle} {chartTitle}</h4>',
    },
  },
};
