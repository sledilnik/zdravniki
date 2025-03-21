/** @import * as Types from "../../types" */

import { renderToString } from 'react-dom/server';

import { CHART_COLORS } from 'pages/Analytics/constants';
import { sloOBMap } from 'pages/Analytics/data/geo-json-maps';

import { MapChartTooltip } from './MapChartTooltip';
import { prepareOverviewMapSeriesData } from './overview-data-util';

export const COLORS = Object.freeze({
  minColor: 'rgba(220,53,69,1)',
  maxColor: 'rgba(228, 237, 231, 1)',
  selectColor: 'rgba(38,197,237,0.1)',
  border: {
    normal: 'rgba(158, 163, 159)',
    select: 'rgba(38,197,237,0.5)',
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
    dataClassColor: 'tween',
    dataClasses: [
      {
        from: 0,
        to: 0.5,
        id: 'low',
      },
      {
        from: 0.5,
        to: 0.75,
        id: 'medium',
      },
      {
        from: 0.75,
        to: 0.8,
        id: 'high',
      },
      {
        from: 0.8,
        to: 0.85,
        id: 'very-high',
      },
      {
        from: 0.85,
        to: 0.9,
        id: 'extreme',
      },
      {
        from: 0.9,
        to: 0.95,
        id: 'very-extreme',
      },
      {
        from: 0.95,
        to: 1,
        id: 'extreme-extreme',
      },
    ],
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
      borderColor: COLORS.border.normal,
      borderWidth: 1,
      tooltip: {
        headerFormat: '',
        pointFormat: '{point.municipality}: {point.value}',
      },
    },
  ],
  accessibility: {
    screenReaderSection: {
      beforeChartFormat: '<h4>{chartSubtitle} {chartTitle}</h4>',
    },
  },
};
