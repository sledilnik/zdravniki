/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */

import { useEffect, useMemo, useRef, useState } from 'react';

import { cx } from 'class-variance-authority';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { t } from 'i18next';

import { withErrorBoundary } from 'components/Shared/ErrorBoundary';
import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { Separator } from 'pages/Analytics/components/ui/separator';

import { Icon } from 'components/Shared/Icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'pages/Analytics/components/ui/dropdown-menu';
import { useFilterState } from 'pages/Analytics/hooks';
import { createCSVContent, exportToCsv, exportToJson } from 'pages/Analytics/utils/download-utils';

import { secondChartOptions } from '../TaskA/chart-options';
import {
  CITY_MUNICIPALITIES_LIST,
  DEFAULTS,
  uniqueOverviewDoctorTypesSet,
  uniqueOverviewYearsSet,
} from '../TaskA/constants';

import { prepareDetailLineChartSeries } from '../TaskA/detail-data-util';
import { FilterForm } from '../TaskA/FilterForm';
import { calculateYearlyStatistics } from '../TaskA/scorecards-calc-util';

import styles from '../Cards.module.css';

const TaskATrend = function TaskATrend({ id }) {
  const tTaskATrend = t('analytics.taskATrend', { returnObjects: true });
  const tCommon = t('analytics.common', { returnObjects: true });
  const [, setInit] = useState(false);
  const { filterState, onFilterChange } = useFilterState(DEFAULTS);

  const [chartOptions, setChartOptions] = useState({
    ...secondChartOptions,
    accessibility: {
      screenReaderSection: {
        beforeChartFormat: '<h4>{chartSubtitle} {chartTitle}</h4>',
      },
    },
  });

  /** @type {React.RefObject<Types.HighchartsReactRefObject>} */
  const chartRef = useRef(null);

  useEffect(() => {
    setInit(true);
  }, []);

  const { doctorType } = filterState;

  const chartSeries = useMemo(() => prepareDetailLineChartSeries([], doctorType), [doctorType]);

  useEffect(() => {
    setChartOptions({
      series: chartSeries,
    });
  }, [chartSeries]);

  const currentSelectedYear = Number(filterState.year);
  const stats = useMemo(
    () => calculateYearlyStatistics(currentSelectedYear, chartSeries),
    [currentSelectedYear, chartSeries],
  );

  const handleCsvChartDownload = () => {
    const filename = `neopredeljeni-${filterState.doctorType}.csv`;
    const isSloveniaSelected = filterState.municipalities.length === 0;
    const isCities = CITY_MUNICIPALITIES_LIST.every(m => filterState.municipalities.includes(m));
    const selection = isSloveniaSelected ? ['Slovenija'] : filterState.municipalities;

    const data = chartSeries.map(item => ({
      ageGroup: item.name,
      data: item.data.map(d => ({
        year: d.year,
        ageGroup: item.name,
        insuredPeopleCount: d.insuredPeopleCount,
        insuredPeopleCountWithIOZ: d.insuredPeopleCountWithIOZ,
        insuredPeopleCountWithoutIOZ: d.insuredPeopleCountWithoutIOZ,
        iozRatio: d.iozRatio,
        selection: selection.join(','),
        isCities: isCities ? 'Da' : 'Ne',
      })),
    }));

    const csvHeaders = [
      'year',
      'ageGroup',
      'insuredPeopleCount',
      'insuredPeopleCountWithIOZ',
      'insuredPeopleCountWithoutIOZ',
      'iozRatio',
      'selection',
      'isCities',
    ];

    exportToCsv(
      createCSVContent(
        data.flatMap(d => d.data),
        csvHeaders,
      ),
      filename,
    );
  };

  const handleJsonChartDownload = () => {
    const filename = `age-group-neopredeljeni-${filterState.doctorType}.json`;
    const isSloveniaSelected = filterState.municipalities.length === 0;
    const isCities = CITY_MUNICIPALITIES_LIST.every(m => filterState.municipalities.includes(m));
    const selection = isSloveniaSelected ? ['Slovenija'] : filterState.municipalities;

    const data = chartSeries.map(item => ({
      ageGroup: item.name,
      data: item.data.map(d => ({
        year: d.year,
        ageGroup: item.name,
        insuredPeopleCount: d.insuredPeopleCount,
        insuredPeopleCountWithIOZ: d.insuredPeopleCountWithIOZ,
        insuredPeopleCountWithoutIOZ: d.insuredPeopleCountWithoutIOZ,
        iozRatio: d.iozRatio,
      })),
    }));

    exportToJson({ type: filterState.doctorType, stats, isCities, selection, data }, filename);
  };

  return (
    <Card id={id} className={styles.CardWrapper}>
      <div className={cx(styles.Grid, styles.SingleChartGrid)}>
        <CardHeader className={styles.Header}>
          <CardTitle as="h3">{tTaskATrend.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" aria-label="Options" className={styles.IconButton}>
                <Icon name="VerticalDots" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{tTaskATrend.menu}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  {t('analytics.taskA.export', { value: tCommon.ageGroup })}
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <button type="button" onClick={handleCsvChartDownload} style={{ width: '100%' }}>
                    CSV
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button type="button" onClick={handleJsonChartDownload} style={{ width: '100%' }}>
                    JSON
                  </button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <Separator className={styles.Separator} />

        <CardContent className={styles.FiltersWrapper}>
          <FilterForm
            filterState={filterState}
            onChange={onFilterChange}
            filterOptions={{
              municipalities: [],
              years: [...uniqueOverviewYearsSet].sort((a, b) => b - a),
              doctorTypes: [...uniqueOverviewDoctorTypesSet],
            }}
          />
        </CardContent>

        <CardContent className={styles.ChartWrapper}>
          <figure>
            <HighchartsReact
              ref={chartRef}
              highcharts={Highcharts}
              options={chartOptions}
              constructorType="chart"
            />
          </figure>
        </CardContent>
      </div>
    </Card>
  );
};

export default withErrorBoundary(TaskATrend);
