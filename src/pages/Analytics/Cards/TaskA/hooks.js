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
export const useMapChart = ({ setMapChartOptions, setFilterState, init, mapChart }) => {
  useEffect(() => {
    if (!init) return;
    setMapChartOptions({
      plotOptions: {
        series: {
          point: {
            events: {
              select() {
                const sPoints = mapChart?.getSelectedPoints();
                setFilterState(prev => ({
                  ...prev,
                  municipalities: sPoints.map(p => p.municipality),
                }));
              },
              unselect() {
                const sPoints = mapChart?.getSelectedPoints();
                setFilterState(prev => ({
                  ...prev,
                  municipalities: sPoints.map(p => p.municipality),
                }));
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

  const doctorTypeTranslation = tCommon.doctorTypes[filterState.doctorType];

  const mapTitle = t('analytics.taskA.mapTitle', { suffix: tTaskA.mapTitleSuffix });
  const mapSubtitle = t('analytics.taskA.mapSubtitle', {
    doctorType: doctorTypeTranslation,
    year: filterState.year,
  });

  const mapSeriesData = useMemo(() => prepareOverviewMapSeriesData(filterState), [filterState]);

  const [init, setInit] = useState(false);
  const [mapChartOptions, setMapChartOptions] = useState({
    ...initialOptions,
    title: { text: mapTitle },
    subtitle: { text: mapSubtitle },
    accessibility: {
      screenReaderSection: {
        beforeChartFormat: '<h4>{chartSubtitle} {chartTitle}</h4>',
      },
    },
  });

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (!init) return;
    setMapChartOptions({
      series: [{ data: mapSeriesData }],
    });
  }, [init, mapSeriesData]);

  return { mapChartOptions, setMapChartOptions, mapSeriesData, init };
};
