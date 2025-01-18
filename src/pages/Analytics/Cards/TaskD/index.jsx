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
import { prepareTaskDChartOptions } from './data';
import FilterForm from './FilterForm';
import { groupOptions } from './parsed-files';

import styles from '../Cards.module.css';

/**
 * TaskD component renders a card with a content.
 * @param {Object} props - The properties object.
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the card.
 * @returns {JSX.Element} The rendered TaskD component.
 */
const TaskD = function TaskD({ id }) {
  /** @type {Types.HighchartsReactRefObject} */
  const chartRef = useRef(null);
  const [init, setInit] = useState(false);
  const { lng } = useParams();

  const tTaskD = t('analytics.taskD', { returnObjects: true });
  const tCommon = useMemo(() => t('analytics.common', { returnObjects: true }), []);

  /** @type {[TaskDTypes.FilterState, React.Dispatch<React.SetStateAction<TaskDTypes.FilterState>>]} */
  const { filterState, onFilterChange } = useFilterState({
    data: groupOptions[0].options[0].value,
    group: groupOptions[0].options[0].group,
  });

  const chartTitle = tCommon.chartTitle?.replace('{{value}}', tCommon.data[filterState.data]);

  const yAxisTitle = t(`analytics.taskD.yAxis.titles.${filterState.data}`);

  const memoChartOptions = useMemo(
    () =>
      prepareTaskDChartOptions({
        filterState,
        lng,
        chartTitle,
        yAxisTitle,
        seriesTranslations: tCommon.data,
      }),
    [filterState, lng, chartTitle, yAxisTitle, tCommon.data],
  );

  /** @type {[Types.HighchartsOptions, React.Dispatch<React.SetStateAction<"HighchartsOptions">>]} */
  const [chartOptions, setChartOptions] = useState(loMerge(memoChartOptions, initialChartOptions));

  useEffect(() => {
    if (!init) {
      setInit(true);
    }
  }, [init]);

  useEffect(() => {
    setChartOptions({
      xAxis: memoChartOptions.xAxis,
      yAxis: memoChartOptions.yAxis,
      series: memoChartOptions.series,
    });
  }, [memoChartOptions]);

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
