/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/** @import * as Types from '../types' */
import { useEffect, useMemo, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighMaps from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';

import sloOBMap from 'assets/maps/OB.geo.json';

import sloMunicipalitiesJSON from 'assets/data/slovenia_municipalities.json';

import styles from '../Cards/Card.module.css';
import { dimensions } from '../HighchartsOptions/options';
import ChartHeader from '../Cards/ChartHeader';
import CustomSeriesButtons from '../CustomSeriesButtons';

/**
 * @typedef {Object} DataItem
 * @property {string} name
 * @property {number} value
 * @property {string} OB_UIME
 * @property {number} year
 */

/**
 * @typedef {Object} SeriesDataItem
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} SeriesItem
 * @property {string} id
 * @property {string} name
 * @property {SeriesDataItem[]} data
 */

/**
 * @description Transforms the data into a format that Highcharts can understand.
 * @function
 * @param {DataItem[]} data - The data to transform.
 * @returns {SeriesItem[]}
 */
const transformData = data => {
  // Initialize an empty object to accumulate the transformed data
  const result = data.reduce((acc, item) => {
    // If the accumulator doesn't have an entry for the current item's name, create one
    if (!acc[item.name]) {
      acc[item.name] = [];
    }
    // Push the current item's year and value as an object into the corresponding name's array
    acc[item.name].push({ x: item.year, y: item.value });
    return acc;
  }, {});

  // Convert the accumulated object into an array of objects with name and data properties
  return Object.keys(result).map(key => ({
    id: key,
    name: key,
    data: result[key],
  }));
};

/** @type {string[]} */
const sloMunicipalities = sloMunicipalitiesJSON;

/**
 * Generates fake data for Slovenian municipalities from 2013 to 2023.
 *
 * @returns {DataItem[]} An array of objects, each representing data for a municipality in a specific year.
 */
const generateFakeData = () => {
  const fakeData = [];
  for (let i = 2013; i <= 2023; i++) {
    sloMunicipalities.forEach(municipality => {
      fakeData.push({
        name: municipality,
        value: Math.floor(Math.random() * 1000) / 100,
        OB_UIME: municipality,
        year: i,
      });
    });
  }
  return fakeData;
};

const fakeData = generateFakeData();

/**
 * @type {DataItem[]}
 */
const firstChartSeriesMap = fakeData.reduce((acc, item) => {
  if (!acc.has(item.year)) {
    acc.set(item.year, []);
  }
  acc.get(item.year).push(item);
  return acc;
}, new Map());

const yearsSortedDesc = Array.from(firstChartSeriesMap.keys())
  .filter(v => !Number.isNaN(v))
  .sort((a, b) => b - a);

/** @type {Types.HighMapsOptions} */
const mapOptions = {
  chart: {
    map: sloOBMap,
    spacing: 1,
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom',
      x: 10,
    },
  },
  legend: {
    enabled: true,
    align: 'right',
    verticalAlign: 'bottom',
    layout: 'vertical',
    floating: true,
    useHTML: true,
    padding: 12,
  },
  title: {
    text: 'Neki po občinah',
  },
  subtitle: {
    text: 'Klikni na občino za dodatne informacije',
  },
  tooltip: {
    footerFormat: '<span style="font-size: 10px">(Click for details)</span>',
  },
  colorAxis: {
    minColor: '#AAE8F8',
    maxColor: '#095568',
    startOnTick: true,
    endOnTick: true,
    // type: 'logarithmic', can not use logarithmic scale with negative values and 0; use linear scale instead
  },
  responsive: {
    rules: [
      {
        condition: {
          minWidth: dimensions.breakpoints.sm,
        },
        chartOptions: {
          chart: {
            height: dimensions.height.md,
          },
        },
      },
      {
        condition: {
          maxWidth: dimensions.breakpoints.sm,
        },
        chartOptions: {
          chart: {
            height: dimensions.height.sm,
          },
          legend: {
            enabled: true,
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
            floating: false,
            useHTML: true,
          },
        },
      },
    ],
  },
  series: [
    {
      type: 'map',
      name: 'Slo OB Data',
      mapData: sloOBMap,
      joinBy: 'OB_UIME',
      data: firstChartSeriesMap.get(yearsSortedDesc[0]),
      allowPointSelect: true,
      cursor: 'pointer',
      states: {
        select: {
          color: '#95C83F',
          borderColor: 'black',
          dashStyle: 'shortdot',
        },
      },
      borderWidth: 0.5,
      dataLabels: {
        enabled: true,
        format: '{point.properties.OB_UIME}',
        style: {
          textOutline: 'none',
        },
      },
    },
  ],
};

const secondChartSeries = transformData(fakeData);
const secondChartSeriesDataMap = new Map(secondChartSeries.map(item => [item.name, item]));

/** @type {Types.HighchartsOptions} */
const baseSecondChartOptions = {
  chart: {
    type: 'area',
  },
  credits: {
    enabled: false,
  },
  legend: { enabled: false },
  tooltip: {
    split: false,
    shared: true,
    useHTML: true,
  },
  plotOptions: {
    series: {
      events: {},
    },
  },

  xAxis: {
    minTickInterval: 1,
    tickPixelInterval: 50,
    crosshair: true,
  },

  series: [],
};

const RichInfoClick = function RichInfoClick() {
  /** @type {[string, React.Dispatch<React.SetStateAction<Highcharts.Point[]>>]} */
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [mapChartOptions, setMapChartOptions] = useState(mapOptions);
  const [secondChartOptions, setSecondChartOptions] = useState(baseSecondChartOptions);
  const [isInit, setInit] = useState(false);
  const [customSeriesButtonsKey, setCustomSeriesButtonKey] = useState('');

  /** @type {React.RefObject<(Types.HighchartsReactRefObject | null)>} */
  const mapChartRef = useRef(null);
  const mapChart = mapChartRef.current?.chart;

  /** @type {React.RefObject<(Types.HighchartsReactRefObject | null)>} */
  const secondChartRef = useRef(null);
  const secondChart = secondChartRef.current?.chart;

  const selectedPointsLength = selectedPoints.length;

  const series = useMemo(
    () => selectedPoints.map(name => secondChartSeriesDataMap.get(name)),
    [selectedPoints],
  );

  useEffect(() => {
    // console.log('useEffect 1');
    // hack to force re-render to get the chart instance
    setInit(true);
  }, []);

  useEffect(() => {
    // console.log('useEffect 2');
    if (isInit) {
      setMapChartOptions({
        plotOptions: {
          series: {
            point: {
              events: {
                select() {
                  setSelectedPoints(mapChart.getSelectedPoints().map(p => p.name));
                },
                unselect() {
                  setSelectedPoints(mapChart.getSelectedPoints().map(p => p.name));
                },
              },
            },
          },
        },
      });
    }
    setSecondChartOptions({
      chart: {
        events: {
          redraw(e) {
            setCustomSeriesButtonKey(e.target.series?.map(s => s.name).join(', ') ?? ''); // hack to force re-render CustomSeriesButtons component
          },
        },
      },
    });
  }, [isInit, mapChart]);

  useEffect(() => {
    // console.log('useEffect 3');
    if (!secondChart) {
      return;
    }
    if (selectedPointsLength === 0) {
      setSecondChartOptions({ series });
      return;
    }
    setSecondChartOptions({
      series,
      chart: { type: selectedPointsLength > 1 ? 'spline' : 'area' },
    });
  }, [secondChart, selectedPointsLength, series]);

  const onYearChange = e => {
    const newYear = Number(e.target.value);
    const newSeries = firstChartSeriesMap.get(newYear).map(item => ({
      ...item,
      selected: selectedPoints.includes(item.name),
    }));

    setMapChartOptions({
      series: [{ data: newSeries }],
    });
  };

  return (
    <article id="rich-info-click" className={styles.Card}>
      <ChartHeader showPopover={false} title="Neki po občinah" />
      <div style={{ paddingInline: 'var(--inline-padding)', paddingBlock: '0.5em' }}>
        <label htmlFor="year-select">
          Leto:{' '}
          <select
            id="year-select"
            name="year-select"
            onChange={onYearChange}
            style={{ padding: '0.25em 1em', borderRadius: '0.25em' }}
          >
            {yearsSortedDesc.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>
      <figure className={styles.Figure}>
        <HighchartsReact
          ref={mapChartRef}
          highcharts={HighMaps}
          constructorType="mapChart"
          options={mapChartOptions}
        />
        <figcaption className="highcharts-description">Caption map</figcaption>
      </figure>
      <figure className={styles.Figure}>
        <div>
          <h3>
            {selectedPointsLength > 1
              ? 'Primerjaj po občinah'
              : (selectedPoints[0]?.name ?? 'Klikni na občino za prikaz podatkov')}
          </h3>
          <p>
            <kbd>Shift</kbd> + <kbd>klik</kbd> za več občin
          </p>
        </div>
        <HighchartsReact
          ref={secondChartRef}
          highcharts={Highcharts}
          options={secondChartOptions}
        />
        <div className={styles.SeriesButtons}>
          <CustomSeriesButtons key={customSeriesButtonsKey} chart={secondChart} />
        </div>
        <figcaption className="highcharts-description">Caption second chart</figcaption>
      </figure>
    </article>
  );
};

export default RichInfoClick;
