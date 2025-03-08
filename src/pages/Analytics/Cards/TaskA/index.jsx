/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */

import { useEffect, useMemo, useRef } from 'react';
import { cx } from 'class-variance-authority';
import { t } from 'i18next';

import { Separator } from '@/pages/Analytics/components/ui/separator';

import {
  createCSVContent,
  exportToCsv,
  exportToJson,
} from '@/pages/Analytics/utils/download-utils';

import Scorecard from '@/pages/Analytics/components/Scorecard';
import ChartActions from '@/pages/Analytics/components/ChartActions';
import useFilterStore from '@/pages/Analytics/store/filterStore';
import { Link } from '@/pages/Analytics/components/ui/link';
import { mapOptions } from './chart-options';
import {
  assertSetsEqual,
  CITY_MUNICIPALITIES_LIST,
  uniqueOverviewDoctorTypesSet,
  uniqueOverviewMunicipalitiesSet,
  uniqueOverviewYearsSet,
} from './constants';

import { FilterForm } from './FilterForm';
import { useChart, useSelectedPoints } from './hooks';
import { CityButtons } from './components/CityButtons';
import { MapChart } from './components/MapChart';

import styles from '../Cards.module.css';
import { calculateYearlyStatistics } from './scorecards-calc-util';
import { prepareDetailLineChartSeries } from './detail-data-util';
import { withErrorBoundary } from 'react-error-boundary';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

/**
 * TaskA component
 * A card component that displays the TaskA card.
 * It uses the Card component from the ui folder.
 * @param {string} id - The ID of the taskA card.
 * @returns {JSX.Element} The rendered TaskA component.
 */
const TaskA = function TaskA({ id }) {
  const tTaskA = t('analytics.taskA', { returnObjects: true });
  const tCommon = t('analytics.common', { returnObjects: true });
  const { filterState, setFilterState } = useFilterStore();

  /** @type {React.RefObject<Types.HighchartsReactRefObject>} */
  const mapRef = useRef(null);
  /** @type {React.RefObject<HTMLButtonElement>} */
  const citiesButtonRef = useRef(null);
  /** @type {React.RefObject<HTMLButtonElement>} */
  const allCitiesButtonRef = useRef(null);

  const { mapChartOptions, setMapChartOptions, mapSeriesData, init } = useChart(mapOptions, {
    filterState,
  });

  useSelectedPoints(
    {
      setMapChartOptions,
      setFilterState,
      init,
      mapChart: mapRef.current?.chart,
    },
    [init],
  );

  const { municipalities, doctorType } = filterState;

  useEffect(() => {
    const button = citiesButtonRef.current;
    const allButton = allCitiesButtonRef.current;
    if (!button || !allButton) return;
    const isCitiesActive = assertSetsEqual(
      new Set(municipalities),
      new Set(CITY_MUNICIPALITIES_LIST),
    );
    button.setAttribute('data-state', isCitiesActive ? 'active' : 'inactive');
    button.style.pointerEvents = isCitiesActive ? 'none' : 'auto';

    const isAllCitiesActive = municipalities.length === 0;
    allButton.setAttribute('data-state', isAllCitiesActive ? 'active' : 'inactive');
    allButton.style.pointerEvents = isAllCitiesActive ? 'none' : 'auto';
  }, [municipalities]);

  const chartSeries = useMemo(
    () => prepareDetailLineChartSeries(municipalities, doctorType),
    [doctorType, municipalities],
  );

  const currentSelectedYear = Number(filterState.year);
  const stats = useMemo(
    () => calculateYearlyStatistics(currentSelectedYear, chartSeries),
    [currentSelectedYear, chartSeries],
  );

  const handleCsvDownload = () => {
    const filename = `map-neopredeljeni-${filterState.doctorType}.csv`;
    const data = mapSeriesData.map(item =>
      Object.assign(item, { selected: undefined, type: filterState.doctorType }),
    );
    exportToCsv(
      createCSVContent(
        data,
        Object.keys(data[0]).filter(key => !['selected', 'value', 'doctorType'].includes(key)),
      ),
      filename,
    );
  };

  const handleJsonDownload = () => {
    const filename = `map-neopredeljeni-${filterState.doctorType}.json`;
    const data = mapSeriesData.map(item => Object.assign(item, { selected: undefined }));
    exportToJson({ type: filterState.doctorType, data }, filename);
  };

  const openFullScreen = () => {
    mapRef.current.chart.fullscreen.open();
  };

  const printChart = () => {
    mapRef.current.chart.print();
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
            <CardTitle as="h3">{tTaskA.title}</CardTitle>
            <CardTitle variant="description">{tTaskA.subtitle}</CardTitle>
          </div>
          <ChartActions
            actions={{
              openFullScreen,
              printChart,
              handleCsvDownload,
              handleJsonDownload,
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
              years: [...uniqueOverviewYearsSet].sort((a, b) => b - a),
              doctorTypes: [...uniqueOverviewDoctorTypesSet].filter(
                v => v !== 'betterAccessibility',
              ),
            }}
          />
        </CardContent>

        <CardContent className={styles.ScorecardsWrapper}>
          <Scorecard
            valueLabel={filterState.year}
            changeLabel={filterState.year - 1}
            scorecardType="description"
          />
          <Scorecard
            label={tCommon.data.insuredPeopleCount}
            value={stats.currentYear.insuredPeopleCount}
            change={stats.differences.insuredPeopleCount.ratio}
          />
          <Scorecard
            label={tCommon.data.insuredPeopleCountWithoutIOZ}
            value={stats.currentYear.insuredPeopleCountWithoutIOZ}
            change={stats.differences.insuredPeopleCountWithoutIOZ.ratio}
          />
        </CardContent>

        <CardContent className={styles.ChartWrapper}>
          <MapChart ref={mapRef} options={mapChartOptions} />
          <CityButtons municipalities={municipalities} setFilterState={setFilterState} />
          <CardDescription
            style={{ marginTop: '0.5em', fontSize: '0.875em', paddingBlock: '0.5em' }}
          >
            <p>{tTaskA.popup.map}</p>
            <p>
              {tTaskA.popup.withoutIOZ}{' '}
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

export default withErrorBoundary(TaskA);
