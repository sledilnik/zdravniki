import { CHART_COLORS } from 'pages/Analytics/constants';

export const COLORS = {
  insuredPeopleCount: 'rgba(75, 20, 20, 1)',
  insuredPeopleCountWithIOZ: 'rgba(40,167,69,0.31)',
  insuredPeopleCountWithoutIOZ: '#DC3545',
  iozRatio: '#DC3545',
  borderColors: {
    insuredPeopleCount: 'rgba(75, 20, 20, 1)',
    insuredPeopleCountWithIOZ: 'rgba(40,167,69,1)',
    insuredPeopleCountWithoutIOZ: '#C62F3F',
    iozRatio: '#DC3545',
  },
};

function formatPercentage(value) {
  const lang = document.documentElement.lang || 'en-US';
  const intl = new Intl.NumberFormat(lang, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return intl.format(value);
}

function formatNumber(value) {
  const lang = document.documentElement.lang || 'en-US';
  const intl = new Intl.NumberFormat(lang);
  return intl.format(value);
}
/**
 *
 * @param {Number} value
 * @param {"count" | ratio} type
 * @returns formatted value
 */
function formatValue(value, type) {
  switch (type) {
    case 'ratio':
      return formatPercentage(value);
    case 'count':
      return formatNumber(value);
    default:
      return formatNumber(value);
  }
}

function formatTooltip(context) {
  const { points } = context;

  return points.reduce((s, point) => {
    const { symbolName } = point.series.legendItem.symbol;
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

    return `${s}<br/><span style="color: ${point.series.color};">${symbol}</span> ${point.series.name}: <b>${formatValue(point.y, point.series.userOptions.valueType)}</b>`;
  }, `<b>${context.x}</b>`);
}

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
          return formatPercentage(this.value);
        },
      },
    },
  ],
  plotOptions: {
    series: {
      marker: { radius: 4 },
    },
    column: {
      stacking: 'normal',
      borderWidth: 1,
    },
  },
  series: [],
  tooltip: {
    useHTML: true,
    shared: true,
    backgroundColor: CHART_COLORS.tooltip.backgroundColor,
    padding: 0,
    style: {
      zIndex: 9000,
    },
    formatter() {
      return `<div style="padding: 0.5em;background-color: ${CHART_COLORS.tooltip.backgroundColor}">${formatTooltip(this)}</div>`;
    },
  },
};
