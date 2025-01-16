export const COLORS = {
  insuredPeopleCount: 'rgba(75, 20, 20, 1)',
  insuredPeopleCountWithIOZ: 'rgba(20, 72, 29, 1)',
  insuredPeopleCountWithoutIOZ: 'rgba(224, 20, 20, 1)',
  iozRatio: 'rgba(81, 122, 217, 0.7)',
  backgroundColor: 'rgba(250, 250, 250, 1)',
  tooltipBackgroundColor: 'rgba(255, 255, 255, 0.8)',
};

export const options = {
  chart: { type: 'line', backgroundColor: COLORS.backgroundColor },
  xAxis: {
    crosshair: true,
  },
  yAxis: [{ id: 'count' }],
  plotOptions: {
    series: {
      marker: { radius: 2 },
    },
  },
  series: [],
  tooltip: {
    useHTML: true,
    shared: true,
    backgroundColor: COLORS.tooltipBackgroundColor,
  },
};
