/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */

import { useEffect, useMemo, useRef, useState } from 'react';

import { IconButton } from '@mui/material';
import { cx } from 'class-variance-authority';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighMaps from 'highcharts/highmaps';
import { t } from 'i18next';

import { withErrorBoundary } from 'components/Shared/ErrorBoundary';
import Scorecard from 'pages/Analytics/components/Scorecard';
import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { Separator } from 'pages/Analytics/components/ui/separator';

import { Icon } from 'components/Shared/Icons';
import Popover from 'pages/Analytics/components/Popover';
import { srOnly } from 'pages/Analytics/highcharts-options/options';
import { useFilterState } from 'pages/Analytics/hooks';
import { createCSVContent, exportToCsv, exportToJson } from 'pages/Analytics/utils/download-utils';
import { COLORS, mapOptions, secondChartOptions } from './chart-options';
import {
  assertSetsEqual,
  CITY_MUNICIPALITIES_LIST,
  DEFAULTS,
  uniqueOverviewDoctorTypesSet,
  uniqueOverviewMunicipalitiesSet,
  uniqueOverviewYearsSet,
} from './constants';

import { Button } from './Buttons';
import { prepareDetailLineChartSeries } from './detail-data-util';
import { FilterForm } from './FilterForm';
import { useMapChart } from './hooks';
import { prepareOverviewMapSeriesData } from './overview-data-util';
import { calculateYearlyStatistics } from './scorecards-calc-util';

import styles from '../Cards.module.css';
import buttonStyles from './Buttons.module.css';

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
  const [init, setInit] = useState(false);
  const { filterState, onFilterChange, setFilterState } = useFilterState(DEFAULTS);

  const doctorTypeTranslation = tCommon.doctorTypes[filterState.doctorType];

  const mapTitle = t('analytics.taskA.mapTitle', { suffix: tTaskA.mapTitleSuffix });
  const mapSubtitle = t('analytics.taskA.mapSubtitle', {
    doctorType: doctorTypeTranslation,
    year: filterState.year,
  });
  const chartTitle = t('analytics.taskA.chartTitle', { suffix: tTaskA.chartTitleSuffix });
  const chartSubtitle = t('analytics.taskA.chartSubtitle', {
    doctorType: doctorTypeTranslation,
  });

  const [mapChartOptions, setMapChartOptions] = useState({
    ...mapOptions,
    title: { text: mapTitle },
    subtitle: { text: mapSubtitle },
    accessibility: {
      screenReaderSection: {
        beforeChartFormat: '<h4>{chartSubtitle} {chartTitle}</h4>',
      },
    },
  });
  const [chartOptions, setChartOptions] = useState({
    ...secondChartOptions,
    title: { text: chartTitle },
    subtitle: { text: chartSubtitle },
    accessibility: {
      screenReaderSection: {
        beforeChartFormat: '<h4>{chartSubtitle} {chartTitle}</h4>',
      },
    },
  });

  /** @type {React.RefObject<Types.HighchartsReactRefObject>} */
  const mapRef = useRef(null);
  /** @type {React.RefObject<Types.HighchartsReactRefObject>} */
  const chartRef = useRef(null);
  /** @type {React.RefObject<HTMLButtonElement>} */
  const citiesButtonRef = useRef(null);
  /** @type {React.RefObject<HTMLButtonElement>} */
  const allCitiesButtonRef = useRef(null);

  const [colors, setColors] = useState({ ...COLORS });

  useEffect(() => {
    setInit(true);
  }, []);

  useMapChart(
    {
      setMapChartOptions,
      setFilterState,
      init,
      mapChart: mapRef.current?.chart,
    },
    [init],
  );

  const { municipalities, doctorType } = filterState;

  const mapSeriesData = useMemo(() => prepareOverviewMapSeriesData(filterState), [filterState]);
  const chartSeries = useMemo(
    () => prepareDetailLineChartSeries(municipalities, doctorType),
    [doctorType, municipalities],
  );

  useEffect(() => {
    setMapChartOptions({
      series: [{ data: mapSeriesData }],
    });

    setChartOptions({
      series: chartSeries,
    });
  }, [chartSeries, mapSeriesData]);

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

  useEffect(() => {
    setMapChartOptions(() => ({
      colorAxis: {
        minColor: colors.minColor,
        maxColor: colors.maxColor,
      },
      series: [
        {
          states: {
            select: {
              color: colors.selectColor,
            },
          },
        },
      ],
    }));
  }, [colors, setMapChartOptions]);

  const onColorChange = e => {
    const { name, value } = e.target;
    setColors({ ...colors, [name]: value });
  };

  const currentSelectedYear = Number(filterState.year);
  const stats = useMemo(
    () => calculateYearlyStatistics(currentSelectedYear, chartSeries),
    [currentSelectedYear, chartSeries],
  );

  const handleAllCitiesClick = () => {
    const button = allCitiesButtonRef.current;

    if (!button) {
      return;
    }
    const prevDataState = button.getAttribute('data-state');

    if (prevDataState === 'active') {
      return;
    }

    button.setAttribute('data-state', prevDataState === 'inactive' ? 'active' : 'inactive');
    setFilterState(prev => ({
      ...prev,
      municipalities: [],
    }));
  };

  const handleCityMunicipalitiesClick = () => {
    const button = citiesButtonRef.current;

    if (!button) {
      return;
    }
    const prevDataState = button.getAttribute('data-state');
    button.setAttribute('data-state', prevDataState === 'inactive' ? 'active' : 'inactive');
    setFilterState(prev => ({
      ...prev,
      municipalities: prevDataState === 'inactive' ? CITY_MUNICIPALITIES_LIST : [],
    }));
  };

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

  const handleCsvMapDownload = () => {
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

  const handleJsonMapDownload = () => {
    const filename = `map-neopredeljeni-${filterState.doctorType}.json`;
    const data = mapSeriesData.map(item => Object.assign(item, { selected: undefined }));
    exportToJson({ type: filterState.doctorType, data }, filename);
  };

  return (
    <Card id={id} className={styles.CardWrapper}>
      <div className={cx(styles.Grid, styles.DoubleChartGrid)}>
        <CardHeader className={styles.Header}>
          <CardTitle as="h3">{tTaskA.title}</CardTitle>
          <Popover
            options={[
              { label: 'Download Age Groups CSV ', onClick: handleCsvChartDownload },
              { label: 'Download Age Groups JSON', onClick: handleJsonChartDownload },
              { label: 'Download Map CSV', onClick: handleCsvMapDownload },
              { label: 'Download Map JSON', onClick: handleJsonMapDownload },
            ]}
          >
            <IconButton>
              <Icon name="VerticalDots" />
            </IconButton>
          </Popover>
        </CardHeader>
        <Separator className={styles.Separator} />
        <CardContent className={styles.FiltersWrapper}>
          <FilterForm
            filterState={filterState}
            onChange={onFilterChange}
            filterOptions={{
              municipalities: [...uniqueOverviewMunicipalitiesSet],
              years: [...uniqueOverviewYearsSet].sort((a, b) => b - a),
              doctorTypes: [...uniqueOverviewDoctorTypesSet],
            }}
          />
        </CardContent>
        <CardContent className={styles.SettingsWrapper}>
          <div>{tCommon.buttons.mapSettings}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label>
              {tCommon.buttons.min}:{' '}
              <input
                type="color"
                value={colors.minColor}
                onChange={onColorChange}
                name="minColor"
              />
            </label>
            <label>
              {tCommon.buttons.max}:{' '}
              <input
                type="color"
                value={colors.maxColor}
                onChange={onColorChange}
                name="maxColor"
              />
            </label>
            <label>
              {tCommon.buttons.selected}:{' '}
              <input
                type="color"
                value={colors.selectColor}
                onChange={e => setColors({ ...colors, selectColor: e.target.value })}
                name="selectColor"
              />
            </label>
            <button type="button" onClick={() => setColors({ ...COLORS })}>
              {tCommon.buttons.reset}
            </button>
          </div>
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
        <CardContent className={styles.MapWrapper}>
          <figure>
            <HighchartsReact
              ref={mapRef}
              highcharts={HighMaps}
              constructorType="mapChart"
              options={mapChartOptions}
            />
          </figure>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button
              ref={allCitiesButtonRef}
              type="button"
              data-state="active"
              onClick={handleAllCitiesClick}
            >
              Cela Slovenija
            </Button>
            <Button
              ref={citiesButtonRef}
              type="button"
              onClick={handleCityMunicipalitiesClick}
              data-state="inactive"
            >
              {citiesButtonRef.current?.getAttribute('data-state') === 'inactive'
                ? tCommon.buttons.cityMunicipalitiesInactive
                : tCommon.buttons.cityMunicipalitiesActive}
            </Button>
            {filterState.municipalities.map(municipality => (
              <label key={municipality} className={buttonStyles.MunicipalityCheckbox}>
                <input
                  style={{
                    ...srOnly,
                  }}
                  type="checkbox"
                  value={municipality}
                  checked
                  onChange={e => {
                    setFilterState(prev => ({
                      ...prev,
                      municipalities: prev.municipalities.filter(m => m !== e.target.value),
                    }));
                  }}
                />
                {municipality} <Icon name="Close" width="0.5rem" height="0.5rem" />
              </label>
            ))}
          </div>
        </CardContent>
        <CardContent className={styles.ChartWrapper}>
          <CardTitle variant="subtitle">{tTaskA.chartTitleSuffix}</CardTitle>
          <CardTitle variant="description">{doctorTypeTranslation}</CardTitle>
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

export default withErrorBoundary(TaskA);
