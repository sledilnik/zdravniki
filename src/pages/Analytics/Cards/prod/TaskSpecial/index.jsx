/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { t } from 'i18next';

import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { Separator } from 'pages/Analytics/components/ui/separator';

import FilterForm from './FilterForm';

import { DEFAULTS, uniqueOverviewDoctorTypesSet } from '../../TaskA/constants';
import { prepareDetailLineChartSeries } from './data';

const COLORS = {
  insuredPeopleCount: 'rgba(58, 105, 217, 0.8)', // Light blue
  insuredPeopleCountWithIOZ: 'rgba(255, 153, 153, 0.5)', // Pale red
  insuredPeopleCountWithoutIOZ: 'rgba(255, 51, 51, 1)', // Bright red
  iozRatio: 'rgba(81, 122, 217, 0.7)', // Muted blue

  backgroundColor: 'rgba(250, 250, 250, 1)', // Near white
  tooltipBackgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
};

const options = {
  chart: { type: 'line', backgroundColor: COLORS.backgroundColor },
  title: {
    text: 'My chart',
  },
  xAxis: {
    crosshair: true,
    title: { text: 'year' },
  },
  yAxis: [
    { id: 'count', title: { text: 'count' } },
    { id: 'percent', title: { text: 'percent' }, opposite: true },
  ],
  plotOptions: {
    column: {
      stacking: 'normal', // Enable stacking for column series
      borderWidth: 0,
    },
    // dataLabels: {
    //   enabled: true,
    //   // inside: true,
    // },
  },
  series: [],
  tooltip: {
    useHTML: true,
    shared: true,
    backgroundColor: COLORS.tooltipBackgroundColor,
  },
};

const TaskSpecial = function TaskSpecial({ id }) {
  const [init, setInit] = useState(false);
  const [chartOptions, setChartOptions] = useState(options);
  const [filterState, setFilterState] = useState({
    doctorType: DEFAULTS.doctorType,
  });
  /** @type {React.RefObject<Types.HighchartsReactRefObject>} */
  const chartRef = useRef(null);

  const tTaskSpecial = t('analytics.taskSpecial', { returnObjects: true });

  useEffect(() => {
    if (!init) {
      setInit(true);
    }
  }, [init]);

  const chartTitle = tTaskSpecial.title;

  const chartSeries = useMemo(
    () =>
      prepareDetailLineChartSeries(filterState.doctorType).map(serie => ({
        ...serie,
        visible: !['insuredPeopleCount'].includes(serie.id),
        color: COLORS[serie.id],
        type: ['insuredPeopleCount', 'iozRatio'].includes(serie.id) ? 'line' : 'column', // Line for count and ratio, bar for others
        stacking: ['insuredPeopleCountWithIOZ', 'insuredPeopleCountWithoutIOZ'].includes(serie.id)
          ? 'normal'
          : undefined, // Stack for IOZ series
        // dataLabels: {
        //   enabled: ['insuredPeopleCountWithIOZ', 'insuredPeopleCountWithoutIOZ'].includes(serie.id),
        //   // inside: true,
        //   style: {
        //     fontSize: '0.75rem',
        //     color: 'black',
        //     textOutline: 'none', // Optional: Remove the default text outline
        //   },
        // },
        marker: { radius: 2, enabled: false },
      })),

    [filterState.doctorType],
  );

  useEffect(() => {
    if (!init) return;

    setChartOptions({
      title: {
        text: chartTitle,
      },
      xAxis: {
        categories: [...new Set(chartSeries.flatMap(serie => serie.data.map(item => item.x)))].sort(
          (a, b) => a - b,
        ),
      },
      series: chartSeries,
    });
  }, [init, chartTitle, chartSeries]);

  const onFilterChange = e => {
    const { name, value } = e.target;

    setFilterState({ ...filterState, [name]: value });
  };

  return (
    <Card id={id}>
      <CardHeader>
        <CardTitle>{tTaskSpecial.title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <FilterForm
          filterState={filterState}
          onChange={onFilterChange}
          filterOptions={{
            doctorTypes: [...uniqueOverviewDoctorTypesSet].filter(item =>
              ['gp', 'den', 'gyn'].includes(item),
            ),
          }}
        />
      </CardContent>
      <CardContent>
        <figure>
          <HighchartsReact ref={chartRef} highcharts={Highcharts} options={chartOptions} />
        </figure>
      </CardContent>
    </Card>
  );
};

export default TaskSpecial;
