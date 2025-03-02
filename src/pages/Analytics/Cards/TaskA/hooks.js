/** @import * as Types "../../../types" */
/** @import * as TaskATypes from "./types" */

import { t } from 'i18next';
import { useState, useEffect, useMemo } from 'react';
import { prepareOverviewMapSeriesData } from './overview-data-util';

/**
 *
 * @param {Object} params
 * @param {React.Dispatch<React.SetStateAction<TaskATypes.UserInputsValues>>} params.initialFilterState
 * @param {React.Dispatch<React.SetStateAction<Types.HighMapsOptions>>} params.setFilterState
 * @param {boolean} params.init
 * @param {Highcharts.Chart} params.mapChart
 * @returns {void}
 */
export const useSelectedPoints = ({ setMapChartOptions, setFilterState, init, mapChart }) => {
  useEffect(() => {
    if (!init) return;
    setMapChartOptions({
      plotOptions: {
        series: {
          point: {
            events: {
              select() {
                const sPoints = mapChart?.getSelectedPoints();
                setFilterState(
                  'municipalities',
                  sPoints.map(p => p.municipality),
                );
              },
              unselect() {
                const sPoints = mapChart?.getSelectedPoints();
                setFilterState(
                  'municipalities',
                  sPoints.map(p => p.municipality),
                );
              },
            },
          },
        },
      },
    });
  }, [init, mapChart, setFilterState, setMapChartOptions]);
};

export const useChart = (initialOptions, { filterState }) => {
  const tTaskA = t('analytics.taskA', { returnObjects: true });
  const tCommon = t('analytics.common', { returnObjects: true });

  const { municipalities } = filterState;

  const doctorTypeTranslation = tCommon.doctorTypes[filterState.doctorType];

  const title = t(tTaskA.chart.title);
  const cities = municipalities.join(', ') || t('analytics.common.buttons.allCities');
  const subtitle = t('analytics.taskA.chart.subtitle', {
    doctorType: doctorTypeTranslation,
    year: filterState.year,
    cities,
  });

  const mapSeriesData = useMemo(() => prepareOverviewMapSeriesData(filterState), [filterState]);
  const memoTitles = useMemo(
    () => ({
      title: { text: title },
      subtitle: { text: subtitle },
    }),
    [subtitle, title],
  );

  const [init, setInit] = useState(false);
  const [mapChartOptions, setMapChartOptions] = useState({
    ...initialOptions,
    ...memoTitles,
    accessibility: {
      screenReaderSection: {
        beforeChartFormat: '<h4>{chartSubtitle} {chartTitle}</h4>', // TODO: move to use effect and apply for all charts
      },
    },
  });

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (!init) return;
    setMapChartOptions({
      ...memoTitles,
      series: [{ data: mapSeriesData }],
    });
  }, [init, mapSeriesData, memoTitles]);

  return { mapChartOptions, setMapChartOptions, mapSeriesData, init };
};
