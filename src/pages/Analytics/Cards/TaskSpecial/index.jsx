/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { t } from 'i18next';
import loMerege from 'lodash/merge';

import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { Separator } from 'pages/Analytics/components/ui/separator';

import FilterForm from './FilterForm';

import { DEFAULTS, uniqueOverviewDoctorTypesSet } from '../TaskA/constants';
import { prepareDetailLineChartSeries, seriesToShow } from './data';

const COLORS = {
  insuredPeopleCount: 'rgba(75, 20, 20, 1)',
  insuredPeopleCountWithIOZ: 'rgba(20, 72, 29, 1)',
  insuredPeopleCountWithoutIOZ: 'rgba(224, 20, 20, 1)',
  iozRatio: 'rgba(81, 122, 217, 0.7)',
  backgroundColor: 'rgba(250, 250, 250, 1)',
  tooltipBackgroundColor: 'rgba(255, 255, 255, 0.8)',
};

const options = {
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

const TaskSpecial = function TaskSpecial({ id }) {
  const tTaskSpecial = t('analytics.taskSpecial', { returnObjects: true });
  const tCommon = t('analytics.common', { returnObjects: true });

  const [init, setInit] = useState(false);
  const [chartOptions, setChartOptions] = useState(
    loMerege(
      {
        series: seriesToShow.map(name => ({
          name: tCommon.data[name],
          color: COLORS[name],
        })),
        yAxis: [
          {
            id: 'count',
            title: { text: tTaskSpecial.yAxis.title },
          },
        ],
      },
      options,
    ),
  );
  const [filterState, setFilterState] = useState({
    doctorType: DEFAULTS.doctorType,
  });
  /** @type {React.RefObject<Types.HighchartsReactRefObject>} */
  const chartRef = useRef(null);

  useEffect(() => {
    if (!init) {
      setInit(true);
    }
  }, [init]);

  const { chartTitle } = tTaskSpecial;

  const chartSeries = useMemo(
    () =>
      prepareDetailLineChartSeries(filterState.doctorType, seriesToShow).map(serie => ({
        ...serie,
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
