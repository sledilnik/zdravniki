/* eslint-disable react/prop-types */
/** @import * as Types from "../../types"  */
/** @import * as DataTypes from "../DataByYearAndAgeGroupCard/data" */

import { useState, useMemo, useEffect } from 'react';

import Highcharts from 'highcharts';
import HighMaps from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import { merge as loMerge } from 'lodash';

import { PauseIcon, PlayArrowIcon } from 'components/Shared/Icons';

import { mapOptions as baseMapOptions } from './chart-options';

/**
 * @param {Object} props
 * @param {Map<DataTypes<DataTypes.Year, DataTypes.AgeGroupItem[]} props.data - The data for the chart.
 * @param {DataTypes.AgeGroup} props.ageGroup - The age group to display.
 */
const MotionCardHighMap = function MotionCardHighMap({ data, ageGroup }) {
  const years = useMemo(() => Array.from(data.keys()).sort((a, b) => a - b), [data]);
  const [yearIndex, setYearIndex] = useState(0);
  const [mapOptions, setMapOptions] = useState(
    loMerge(
      { title: { text: ageGroup }, series: [{ data: data.get(years[yearIndex]) }] },
      baseMapOptions,
    ),
  );

  const [chartOptions] = useState({
    title: {
      text: 'Comparing chart',
      height: '300px',
    },
    chart: {
      type: 'line',
    },
    series: [{ data: [1, 2, 3, 4, 5] }],
  });

  const year = years[yearIndex];

  useEffect(() => {
    setMapOptions({ series: [{ data: data.get(year) }] });
  }, [data, ageGroup, year]);

  const onYearChange = e => {
    setYearIndex(e.target.value);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      clearInterval(intervalId);
      setIsPlaying(false);
      return;
    }
    const id = setInterval(() => {
      setYearIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % years.length;
        if (nextIndex === 0) {
          clearInterval(id);
          setIsPlaying(false);
        }
        return nextIndex;
      });
    }, 1000);
    setIntervalId(id);
    setIsPlaying(true);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      <HighchartsReact highcharts={HighMaps} options={mapOptions} constructorType="mapChart" />
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
