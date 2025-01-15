/* eslint-disable react/prop-types */
/** @import * as Types from "../../../types" */
/** @import * as TaskDTypes from "./types" */
import { useEffect, useMemo, useRef, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { t } from 'i18next';
import { useParams } from 'react-router';

import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';

import { withErrorBoundary } from 'components/Shared/ErrorBoundary';

import { initialChartOptions } from './chart-options';
import FilterForm from './FilterForm';
import { groupOptions, groupYAxisLabelFormat, parsedData } from './parsed-files';

/**
 * TaskD component renders a card with a content.
 * @param {Object} props - The properties object.
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the card.
 * @returns {JSX.Element} The rendered TaskD component.
 */
const TaskD = function TaskD({ id }) {
  const { lng } = useParams();
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

  const tTaskD = t('analytics.taskD', { returnObjects: true });

  useEffect(() => {
    if (!init) {
      setInit(true);
    }
  }, [init]);

  /** @type {TaskDTypes.ParsedData} */
  const data = useMemo(() => parsedData.get(filterState.data), [filterState]);
  const yAxisTitle = t(`analytics.taskD.yAxis.titles.${filterState.data}`);
  const labelFormat = groupYAxisLabelFormat[filterState.data];

  useEffect(() => {
    // Extract unique years from both public and private data
    const uniqueYears = new Set([
      ...data.public.map(point => new Date(point[0]).getUTCFullYear()),
      ...data.private.map(point => new Date(point[0]).getUTCFullYear()),
    ]);

    // Calculate tick positions for starting years
    const tickPositions = Array.from(uniqueYears)
      .sort((a, b) => a - b) // Ensure years are sorted
      .map(year => Date.UTC(year, 0, 1)); // Start of each year

    setChartOptions({
      xAxis: {
        tickPositions,
      },
      yAxis: {
        title: {
          text: yAxisTitle,
        },
        labels: {
          format: labelFormat,
          formatter() {
            const localeBase = lng.split('-')[0];
            const suffixMap = {
              sl: 'tis.',
              en: 'k',
            };
            const { value } = this;

            const suffix = suffixMap[localeBase] || 'k';
            // eslint-disable-next-line react/no-this-in-sfc
            const { format } = this.chart.userOptions.yAxis[0].labels;

            if (value >= 1_000_000) {
              const formatted = new Intl.NumberFormat(lng, {
                style: format,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(value / 1_000); // Convert to "thousands"
              return `${formatted} ${suffix}`;
            }

            return new Intl.NumberFormat(lng, {
              style: format,
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
              useGrouping: 'auto',
            }).format(format === 'percent' ? value / 100 : value);
          },
        },
      },
      series: [
        { name: t('analytics.common.contractTypes.public'), data: [...data.public] },
        { name: t('analytics.common.contractTypes.private'), data: [...data.private] },
      ],
    });
  }, [data, labelFormat, yAxisTitle, lng]);

  const onFormChange = e => {
    const { name, value } = e;
    setFilterState(prev => ({ ...prev, [name]: value, group: e.group }));
  };

  return (
    <Card id={id}>
      <CardHeader>
        <CardTitle>{tTaskD.title}</CardTitle>
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

export default withErrorBoundary(TaskD);
