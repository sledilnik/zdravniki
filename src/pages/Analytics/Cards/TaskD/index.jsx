/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/** @import * as Types from "../../../types" */
/** @import * as TaskDTypes from "./types" */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { t } from 'i18next';
import loMerge from 'lodash/merge';

import { withErrorBoundary } from 'components/Shared/ErrorBoundary';
import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';

import { cx } from 'class-variance-authority';
import { Separator } from 'pages/Analytics/components/ui/separator';
import { useFilterState } from 'pages/Analytics/hooks';
import { initialChartOptions } from './chart-options';
import FilterForm from './FilterForm';
import { groupOptions, groupYAxisLabelFormat, parsedData } from './parsed-files';

import styles from '../Cards.module.css';

/**
 * TaskD component renders a card with a content.
 * @param {Object} props - The properties object.
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the card.
 * @returns {JSX.Element} The rendered TaskD component.
 */
const TaskD = function TaskD({ id }) {
  const { lng } = useParams();

  const tTaskD = t('analytics.taskD', { returnObjects: true });
  const tCommon = t('analytics.common', { returnObjects: true });

  /** @type {Types.HighchartsReactRefObject} */
  const chartRef = useRef(null);
  const [init, setInit] = useState(false);
  /** @type {[TaskDTypes.FilterState, React.Dispatch<React.SetStateAction<TaskDTypes.FilterState>>]} */
  const { filterState, onFilterChange } = useFilterState({
    data: groupOptions[0].options[0].value,
    group: groupOptions[0].options[0].group,
  });

  const chartTitle = t('analytics.taskD.chartTitle', {
    value: tCommon.data[filterState.data],
  });
  /** @type {[Types.HighchartsOptions, React.Dispatch<React.SetStateAction<"HighchartsOptions">>]} */
  const [chartOptions, setChartOptions] = useState(
    loMerge(
      {
        title: {
          text: chartTitle,
        },
        accessibility: {
          screenReaderSection: {
            beforeChartFormat: '<h4>{chartTitle}</h4>',
          },
        },
      },
      initialChartOptions,
    ),
  );

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

  return (
    <Card id={id} className={styles.CardWrapper}>
      <div className={cx(styles.Grid, styles.SingleChartGrid)}>
        <CardHeader className={styles.Header}>
          <CardTitle as="h3">{tTaskD.title}</CardTitle>
        </CardHeader>
        <Separator className={styles.Separator} />
        <CardContent className={styles.FiltersWrapper}>
          <FilterForm filterState={filterState} onChange={onFilterChange} />
        </CardContent>
        <CardContent className={styles.ChartWrapper}>
          <figure>
            <HighchartsReact ref={chartRef} highcharts={Highcharts} options={chartOptions} />
          </figure>
        </CardContent>
      </div>
    </Card>
  );
};

export default withErrorBoundary(TaskD);
