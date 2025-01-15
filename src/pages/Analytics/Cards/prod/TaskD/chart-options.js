/** @type {Highcharts["options"]} */
export const initialChartOptions = {
  chart: {
    backgroundColor: 'rgb(248 248 248)',
  },
  title: {
    text: 'TaskD',
  },
  type: 'line',
  xAxis: {
    type: 'datetime',
    tickPositions: [], // To be dynamically set
    labels: {
      format: '{value:%Y}', // Display the year only
    },
    plotLines: [
      {
        color: 'red',
        width: 1,
        value: Date.UTC(2022, 0, 1),
        zIndex: 5,
        label: {
          text: 'opis',
          rotation: 0,
          y: 20,
          style: {
            color: '#333333',
          },
        },
      },
    ],
  },
  series: [],
  yAxis: {
    useHtml: true,
  },
  tooltip: {
    xDateFormat: '%e %B %Y',
    useHtml: true,
    shared: true,
    crosshairs: true,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
};
