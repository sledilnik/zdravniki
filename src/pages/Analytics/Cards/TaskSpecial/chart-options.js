import { CHART_COLORS } from 'pages/Analytics/constants';

export const COLORS = {
  insuredPeopleCount: 'rgba(75, 20, 20, 1)',
  insuredPeopleCountWithIOZ: 'rgba(20, 72, 29, 1)',
  insuredPeopleCountWithoutIOZ: 'rgba(224, 20, 20, 1)',
  iozRatio: 'rgba(224, 20, 20, 1)',
};

export const options = {
  chart: { type: 'line', backgroundColor: CHART_COLORS.chart.backgroundColor },
  xAxis: {
    crosshair: true,
  },
  yAxis: [
    { id: 'count' },
    {
      id: 'ratio',
      opposite: true,
      labels: {
        formatter() {
          const lang = document.documentElement.lang || 'en-US';
          const intl = new Intl.NumberFormat(lang, {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          return intl.format(this.value);
        },
      },
    },
  ],
  plotOptions: {
    series: {
      marker: { radius: 2 },
    },
    column: {
      stacking: 'normal',
      borderWidth: 0,
    },
  },
  series: [],
  tooltip: {
    useHTML: true,
    shared: true,
    backgroundColor: CHART_COLORS.tooltip.backgroundColor,
  },
};
