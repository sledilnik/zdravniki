/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { t } from 'i18next';

import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';

import { withErrorBoundary } from 'components/Shared/ErrorBoundary';
import CustomReactSelect from 'pages/Analytics/components/CustomReactSelect';
import Label from 'pages/Analytics/components/Label';

import { initialChartOptions } from './chart-options';
import { groupOptions, parsedData } from './parsed-files';

function formatGroupLabel(data) {
  return (
    <div>
      <span>{data.label}</span>
      <span>{data.options.length}</span>
    </div>
  );
}

/**
 * FilterForm component for selecting data options
 */
function FilterForm({ filterState, onFormChange }) {
  const tCommon = t('analytics.common', { returnObjects: true });
  const { data: tData } = tCommon;

  // eslint-disable-next-line no-shadow
  const translatedOptions = groupOptions.map(option => ({
    ...option,
    label: tData[option.label],
    options: option.options.map(o => ({ ...o, label: tData[o.label] })),
  }));

  return (
    <form>
      <Label htmlFor="data">Data</Label>
      <CustomReactSelect
        id="data"
        name="data"
        value={{
          name: 'data',
          label: `${tData[filterState.group]}: ${tData[filterState.data]}`,
          value: filterState.data,
        }}
        onChange={onFormChange}
        options={translatedOptions}
        // eslint-disable-next-line react/no-unstable-nested-components
        formatGroupLabel={formatGroupLabel}
      />
    </form>
  );
}

/**
 * PivotkeD component renders a card with a content.
 * @param {Object} props - The properties object.
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the card.
 * @returns {JSX.Element} The rendered PivotkeD component.
 */
const PivotkeD = function PivotkeD({ id }) {
  const chartRef = useRef(null);
  const [init, setInit] = useState(false);
  const [chartOptions, setChartOptions] = useState(initialChartOptions);
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

  const data = useMemo(() => parsedData[filterState.data], [filterState]);

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
