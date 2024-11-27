/* eslint-disable react/prop-types */
/** @import * as Types from "../../types"  */
/** @import * as DataTypes from "../../data/data" */

import { useState, useMemo, useRef, useEffect } from 'react';

import Highcharts from 'highcharts';
import HighMaps from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import { merge as loMerge } from 'lodash';

import { PauseIcon, PlayArrowIcon } from 'components/Shared/Icons';
import { byMunicipalityAndAgeGroupMap } from '../../data/data';

import { mapOptions as baseMapOptions } from './chart-options';

/**
 * @param {Object} props
 * @param {Map<DataTypes<DataTypes.Year, DataTypes.AgeGroupItem[]} props.data - The data for the chart.
 * @param {DataTypes.AgeGroup} props.ageGroup - The age group to display.
 */
const MotionCardHighMap = function MotionCardHighMap({ data, ageGroup }) {
  const mapChartRef = useRef();
  const mapChart = mapChartRef.current?.chart;
  const [init, setInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const years = useMemo(() => Array.from(data.keys()).sort((a, b) => a - b), [data]);

  const yearIndexRef = useRef(0);
  const yearIndex = yearIndexRef.current;

  const intervalIdRef = useRef(null);

  const [mapOptions, setMapOptions] = useState(
    loMerge(
      { title: { text: ageGroup }, series: [{ data: data.get(years[yearIndex]) }] },
      baseMapOptions,
    ),
  );

  const mun1 = useMemo(
    () =>
      byMunicipalityAndAgeGroupMap
        .get('Ljubljana')
        .get(ageGroup)
        .map(item => item.value),
    [ageGroup],
  );
  const mun2 = useMemo(
    () =>
      byMunicipalityAndAgeGroupMap
        .get('Maribor')
        .get(ageGroup)
        .map(item => item.value),
    [ageGroup],
  );

  const [chartOptions] = useState({
    title: {
      text: 'Comparing chart',
      height: '300px',
    },
    chart: {
      type: 'line',
    },
    xAxis: {
      categories: years,
    },
    series: [
      { name: 'Ljubljana', data: mun1 },
      { name: 'Maribor', data: mun2 },
    ],
    tooltip: {
      shared: true,
      useHTML: true,
      split: false,
    },
  });

  useEffect(() => {
    if (!init) {
      setInit(true);
    }
    return () => {
      if (mapChart) {
        mapChart.destroy();
      }
    };
  }, [mapChart, init]);

  const onYearChange = e => {
    yearIndexRef.current = parseInt(e.target.value, 10);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      clearInterval(intervalIdRef.current);
      setIsPlaying(false);
      return;
    }
    const id = setInterval(() => {
      yearIndexRef.current = (yearIndexRef.current + 1) % years.length;
      const year = years[yearIndexRef.current];
      const serieData = data.get(year);
      setMapOptions({
        series: [{ data: serieData }],
      });
      if (yearIndexRef.current === 0) {
        clearInterval(id);
        setIsPlaying(false);
      }
    }, 500);
    intervalIdRef.current = id;
    setIsPlaying(true);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      <HighchartsReact
        ref={mapChartRef}
        highcharts={HighMaps}
        options={mapOptions}
        constructorType="mapChart"
      />
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <div>
        <button
          type="button"
          id={`${ageGroup}-play-pause-button`}
          title="play"
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'pause' : 'play'}
          style={{ display: 'inline-grid', placeItems: 'center' }}
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </button>
        <input
          id={`${ageGroup}-play-range`}
          type="range"
          value={yearIndex}
          onChange={onYearChange}
          min="0"
          max={`${years.length - 1}`}
        />
        <output id={`${ageGroup}-play-output`} htmlFor={`${ageGroup}-play-range`} name="year">
          {years[yearIndex]}
        </output>
      </div>
    </div>
  );
};

export default MotionCardHighMap;
