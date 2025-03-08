/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */

import { useEffect, useRef, useState } from 'react';

import { cx } from 'class-variance-authority';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { t } from 'i18next';

import { withErrorBoundary } from '@/components/Shared/ErrorBoundary';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/pages/Analytics/components/ui/card';
import { Separator } from '@/pages/Analytics/components/ui/separator';

import ChartActions from '@/pages/Analytics/components/ChartActions';
import useFilterStore from '@/pages/Analytics/store/filterStore';
import { Link } from '@/pages/Analytics/components/ui/link';
import { uniqueOverviewDoctorTypesSet } from './constants';

import { FilterForm } from './FilterForm';

import styles from '../Cards.module.css';
import { useChart } from './useChart';
import { initialCharOptions } from './chart-options';
import { uniqueOverviewMunicipalitiesSet } from '../TaskA/constants';
import { CityButtons } from '../TaskA/components/CityButtons';

const TaskATrend = function TaskATrend({ id }) {
  const tTaskATrend = t('analytics.taskATrend', { returnObjects: true });
  const [, setInit] = useState(false);
  const { filterState, setFilterState } = useFilterStore();

  const { chartOptions } = useChart(initialCharOptions, {
    filterState,
  });

  const { municipalities } = filterState;

  /** @type {React.RefObject<Types.HighchartsReactRefObject>} */
  const chartRef = useRef(null);

  useEffect(() => {
    setInit(true);
  }, []);

  const openFullScreen = () => {
    chartRef.current.chart.fullscreen.open();
  };

  const printChart = () => {
    chartRef.current.chart.print();
  };

  const onFilterChange = e => {
    const { name, value } = e.target;
    setFilterState(name, value);
  };

  return (
    <Card id={id} className={styles.CardWrapper}>
      <div className={cx(styles.Grid, styles.SingleChartGrid)}>
        <CardHeader className={styles.Header}>
          <div>
            <CardTitle as="h3">{tTaskATrend.title}</CardTitle>
            <CardTitle variant="description">{tTaskATrend.subtitle}</CardTitle>
          </div>
          <ChartActions
            actions={{
              openFullScreen,
              printChart,
            }}
          />
        </CardHeader>
        <Separator className={styles.Separator} />

        <CardContent className={styles.FiltersWrapper}>
          <FilterForm
            filterState={filterState}
            onChange={onFilterChange}
            filterOptions={{
              municipalities: [...uniqueOverviewMunicipalitiesSet],
              doctorTypes: [...uniqueOverviewDoctorTypesSet].filter(
                v => v !== 'betterAccessibility',
              ),
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
          <CityButtons municipalities={municipalities} setFilterState={setFilterState} />
          <CardDescription
            style={{ marginTop: '0.5em', fontSize: '0.875em', paddingBlock: '0.5em' }}
          >
            <p>
              {tTaskATrend.popup.withoutIOZ}{' '}
              <Link href="https://e-uprava.gov.si/si/podrocja/sociala-zdravje-smrt/zdravje/sociala-osebni-zdravnik.html">
                {t('doctorCard.more')}
              </Link>
            </p>
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  );
};

export default withErrorBoundary(TaskATrend);
