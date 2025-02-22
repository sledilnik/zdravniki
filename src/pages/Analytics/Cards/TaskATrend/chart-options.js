import { CHART_COLORS } from 'pages/Analytics/constants';
import { renderToString } from 'react-dom/server';
import { uniqueOverviewYearsSet } from '../TaskA/constants';
import { LineChartTooltip, LineChartYAxisTitle } from './LineChartComponents';

/** @type {Types.HighchartsOptions} */
export const initialCharOptions = {
  chart: {
    type: 'line',
    backgroundColor: CHART_COLORS.chart.backgroundColor,
  },
  plotOptions: {
    series: { marker: { radius: 2 } },
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
    enabled: true,
  },

  tooltip: {
    shared: true,
    useHTML: true,
    backgroundColor: CHART_COLORS.tooltip.backgroundColor,
    formatter() {
      return renderToString(<LineChartTooltip points={this.points} x={this.x} />);
    },
  },
};
