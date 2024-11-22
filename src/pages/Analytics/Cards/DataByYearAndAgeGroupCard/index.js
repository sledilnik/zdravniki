/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

/** @import * as Types from "../../types" */
import { useEffect, useRef, useState } from 'react';

import Highcharts from 'highcharts';
import HighMaps from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap';

import { mapOptions, chartOptions, YEARS, AGE_GROUPS, byAgeGroupMap } from './chartOptions';
import styles from '../Card.module.css';
import ChartHeader from '../ChartHeader';
import { renderChart } from './utils';

heatmap(Highcharts);

/**
 *
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the chart.
 * @param {React.ComponentProps<"article">["className"]} props.className - The class name for the chart. Defaults to an empty string.
 * @returns {JSX.Element} The rendered RichInfoClick component.
 */
const DataByYearAndAgeGroupCard = function DataByYearAndAgeGroupCard({ id, className = '' }) {
  const [mapChartOptions, setMapChartOptions] = useState(mapOptions);
  const [secondChartOptions, _setSecondChartOptions] = useState(chartOptions);

  /** @type {[import('./data').Year, React.Dispatch<React.SetStateAction<import('./data').Year]} */
  const [year, setYear] = useState([...YEARS][0]);
  /** @type {[import('./data').AgeGroup, React.Dispatch<React.SetStateAction<import('./data').AgeGroup]} */
  const [ageGroup, setAgeGroup] = useState([...AGE_GROUPS][0]);

  /** @type {React.RefObject<(Types.HighchartsReactRefObject | null)>} */
  const mapChartRef = useRef(null);

  const [init, setInit] = useState(false);

  useEffect(() => {
    // console.log('useEffect 1');
    // hack to force re-render to get the chart instance
    setInit(true);
  }, []);

  useEffect(() => {
    // console.log('useEffect 2');
    if (!init) return;
    HighMaps.addEvent(HighMaps.Tooltip, 'refresh', e => {
      if (e.target.chart.title.textStr === mapOptions.title.text) {
        renderChart(e.target.chart?.hoverPoint);
      }
    });

    // eslint-disable-next-line consistent-return
    return () => {
      HighMaps.removeEvent(HighMaps.Tooltip, 'refresh');
    };
  }, [init]);

  const onYearChange = e => {
    const newYear = Number(e.target.value);
    const data = byAgeGroupMap.get(ageGroup);
    setMapChartOptions({
      series: [
        {
          data: data
            .filter(item => item.year === newYear)
            .map(item => {
              const tooltipData = byAgeGroupMap
                .get(item.ageGroup)
                .filter(i => i.name === item.name)
                .map(i => i.value);
              return { ...item, tooltipData };
            }),
        },
      ],
    });
    setYear(Number(newYear));
  };

  const onAgeGroupChange = e => {
    const newAgeGroup = e.target.value;
    const data = byAgeGroupMap.get(newAgeGroup);
    setMapChartOptions({
      series: [
        {
          data: data
            .filter(item => item.year === year)
            .map(item => {
              const tooltipData = byAgeGroupMap
                .get(item.ageGroup)
                .filter(i => i.name === item.name)
                .map(i => i.value);
              return { ...item, tooltipData };
            }),
        },
      ],
    });
    setAgeGroup(newAgeGroup);
  };

  return (
    <article id={id} className={`${styles.Card} ${className}`}>
      <ChartHeader showPopover={false} title={mapOptions.title?.text} />
      <div>
        <div style={{ display: 'inline-block', marginRight: '0.5em' }}>
          <label htmlFor="year-select">
            Leto:{' '}
            <select
              id="year-select"
              name="year"
              onChange={onYearChange}
              value={year}
              style={{ padding: '0.25em 1em', borderRadius: '0.25em' }}
            >
              {YEARS.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ display: 'inline-block' }}>
          <label htmlFor="age-group-select">
            Skupina:{' '}
            <select
              id="age-group-select"
              name="ageGroup"
              value={ageGroup}
              onChange={onAgeGroupChange}
              style={{ padding: '0.25em 1em', borderRadius: '0.25em' }}
            >
              {AGE_GROUPS.map(ageGroup => (
                <option key={ageGroup} value={ageGroup}>
                  {ageGroup}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <figure className={styles.Figure}>
        <HighchartsReact
          ref={mapChartRef}
          highcharts={HighMaps}
          options={mapChartOptions}
          constructorType="mapChart"
        />
      </figure>
      <figure className={`${styles.Figure}`}>
        <HighchartsReact highcharts={Highcharts} options={secondChartOptions} />
      </figure>
    </article>
  );
};

export default DataByYearAndAgeGroupCard;
