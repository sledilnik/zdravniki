/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';

import Highcharts from 'highcharts';
import HighMaps from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap';

import { mapOptions, chartOptions, YEARS, AGE_GROUPS, byAgeGroupMap } from './chartOptions';
import styles from '../Card.module.css';
import ChartHeader from '../ChartHeader';

heatmap(Highcharts);

/**
 *
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the chart.
 * @param {React.ComponentProps<"article">["className"]} props.className - The class name for the chart. Defaults to an empty string.
 * @returns {JSX.Element} The rendered RichInfoClick component.
 */
const DataByYearAndAgeGroupCard = function DataByYearAndAgeGroupCard({ id, className = '' }) {
  const [mapChartOptions, _setMapChartOptions] = useState(mapOptions);
  const [secondChartOptions, _setSecondChartOptions] = useState(chartOptions);

  /** @type {[import('./data').Year, React.Dispatch<React.SetStateAction<import('./data').Year]} */
  const [year, setYear] = useState([...YEARS][0]);
  /** @type {[import('./data').AgeGroup, React.Dispatch<React.SetStateAction<import('./data').AgeGroup]} */
  const [ageGroup, setAgeGroup] = useState([...AGE_GROUPS][0]);

  const onYearChange = e => {
    const newYear = Number(e.target.value);
    const data = byAgeGroupMap.get(ageGroup);
    _setMapChartOptions({
      series: [{ data: data.filter(item => item.year === newYear) }],
    });
    setYear(Number(newYear));
  };

  const onAgeGroupChange = e => {
    const newAgeGroup = e.target.value;
    const data = byAgeGroupMap.get(newAgeGroup);
    _setMapChartOptions({
      series: [{ data: data.filter(item => item.year === year) }],
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
              {[...YEARS].map(year => (
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
              {[...AGE_GROUPS].map(ageGroup => (
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
