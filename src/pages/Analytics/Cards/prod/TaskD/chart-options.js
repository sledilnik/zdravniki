/** @type {Highcharts["options"]} */
export const initialChartOptions = {
  title: {
    text: 'PivotkeD',
    backgroundColor: 'oklch(0.98 0 0)',
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
  tooltip: {
    xDateFormat: '%e %B %Y',
    shared: true,
    crosshairs: true,
  },
};
