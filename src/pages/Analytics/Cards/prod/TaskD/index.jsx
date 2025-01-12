/* eslint-disable react/prop-types */
/** @import * as Types from "../../../types" */
/** @import * as TaskDTypes from "./types" */
import { useEffect, useMemo, useRef, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { t } from 'i18next';

import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';

import { withErrorBoundary } from 'components/Shared/ErrorBoundary';

import { initialChartOptions } from './chart-options';
import FilterForm from './FilterForm';
import { groupOptions, parsedData } from './parsed-files';

/**
 * PivotkeD component renders a card with a content.
 * @param {Object} props - The properties object.
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the card.
 * @returns {JSX.Element} The rendered PivotkeD component.
 */
const PivotkeD = function PivotkeD({ id }) {
  /** @type {Types.HighchartsReactRefObject} */
  const chartRef = useRef(null);
  const [init, setInit] = useState(false);
  /** @type {[Types.HighchartsOptions, React.Dispatch<React.SetStateAction<"HighchartsOptions">>]} */
  const [chartOptions, setChartOptions] = useState(initialChartOptions);
  /** @type {[TaskDTypes.FilterState, React.Dispatch<React.SetStateAction<TaskDTypes.FilterState>>]} */
  const [filterState, setFilterState] = useState({
    data: groupOptions[0].options[0].value,
    group: groupOptions[0].options[0].group,
  });

  const translations = t('analytics.taskD', { returnObjects: true });

  useEffect(() => {
    if (!init) {
      setInit(true);
    }
  }, [init]);

  const data = useMemo(() => parsedData[filterState.data], [filterState.data]);

  useEffect(() => {
    if (!init) return;

    const publicData = data.public;
    const privateData = data.private;

    // Extract unique years from both public and private data
    const uniqueYears = new Set([
      ...publicData.map(point => new Date(point[0]).getUTCFullYear()),
      ...privateData.map(point => new Date(point[0]).getUTCFullYear()),
    ]);

    // Calculate tick positions for starting years
    const tickPositions = Array.from(uniqueYears)
      .sort((a, b) => a - b) // Ensure years are sorted
      .map(year => Date.UTC(year, 0, 1)); // Start of each year

    setChartOptions({
      xAxis: {
        tickPositions,
      },
      series: [
        { name: 'Javni', data: data.public },
        { name: 'Zasebni', data: data.private },
      ],
    });
  }, [init, data]);

  const onFormChange = e => {
    const { name, value } = e;
    setFilterState(prev => ({ ...prev, [name]: value, group: e.group }));
  };

  return (
    <Card id={id}>
      <CardHeader>
        <CardTitle>{translations.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <FilterForm filterState={filterState} onFormChange={onFormChange} />
      </CardContent>
      <CardContent>
        <figure>
          <HighchartsReact ref={chartRef} highcharts={Highcharts} options={chartOptions} />
        </figure>
      </CardContent>
    </Card>
  );
};

export default withErrorBoundary(PivotkeD);
