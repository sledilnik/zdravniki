/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { t } from 'i18next';

import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { Separator } from 'pages/Analytics/components/ui/separator';

import FilterForm from './FilterForm';

import { DEFAULTS, uniqueOverviewDoctorTypesSet } from '../TaskA/constants';

const options = {
  title: {
    text: 'My chart',
  },
  series: [
    {
      data: [1, 2, 3],
    },
  ],
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

  useEffect(() => {
    if (!init) return;

    setChartOptions({
      title: {
        text: chartTitle,
      },
      series: [
        {
          data: [1, 2, 3],
        },
      ],
    });
  }, [init, chartTitle]);

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
