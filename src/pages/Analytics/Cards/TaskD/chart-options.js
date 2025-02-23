import { CHART_COLORS } from 'pages/Analytics/constants';

export const COLORS = {
  public: '#ff9900',
  private: '#00cc66',
};

/** @type {Highcharts["options"]} */
export const initialChartOptions = {
  chart: {
    backgroundColor: CHART_COLORS.chart.backgroundColor,
  },
  plotOptions: {
    series: { marker: { radius: 2 } },
  },
  type: 'line',
  xAxis: {
    type: 'datetime',
    tickPositions: [], // To be dynamically set
    labels: {
      format: '{value:%Y}', // Display the year only
    },
    crosshair: true,
  },
  series: [],
  yAxis: {
    useHtml: true,
  },
  tooltip: {
    xDateFormat: '%e %B %Y',
    useHTML: true,
    shared: true,
    backgroundColor: CHART_COLORS.tooltip.backgroundColor,
    padding: 0,
    style: {
      zIndex: 9000,
    },
    formatter() {
      const { symbolName } = this.point.series.legendItem.symbol;
      let symbol = '';
      switch (symbolName) {
        case 'circle':
          symbol = '●';
          break;
        case 'diamond':
          symbol = '♦';
          break;
        case 'square':
          symbol = '■';
          break;
        case 'triangle':
          symbol = '▲';
          break;
        case 'triangle-down':
          symbol = '▼';
          break;
        default:
          symbol = '-';
          break;
      }

      const { points } = this;
      const lang = document.documentElement.lang || 'en-US';
      const date = new Date(this.x);
      const formattedDateWithYear = new Intl.DateTimeFormat(lang, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);

      let tooltip = `<b>${formattedDateWithYear}</b>`;
      points.forEach(point => {
        const value = new Intl.NumberFormat('sl').format(point.y);
        const { color } = point.series;
        tooltip += `<br><span style="color: ${color}">${symbol}</span> <span>${point.series.name}</span>: <b>${value}</b>`;
      });

      return `<div style="padding: 0.5em;background-color: ${CHART_COLORS.tooltip.backgroundColor}">${tooltip}</div>`;
    },
  },
};
