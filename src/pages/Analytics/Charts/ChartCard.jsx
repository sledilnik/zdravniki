/* eslint-disable react/require-default-props */
// Import TypeScript types from the highcharts module
/**
 * @typedef {import('highcharts').Options} HighchartsOptions
 */

/**
 * @typedef {import('highcharts').Chart} HighchartsChart
 */

import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import accessibility from 'highcharts/modules/accessibility';
import exporting from 'highcharts/modules/exporting';
import * as Icons from 'components/Shared/Icons';
import { baseOptions } from './options';
import SeriesButton from './SeriesButton';

accessibility(Highcharts);
exporting(Highcharts);

Highcharts.setOptions(baseOptions);

/**
 * ChartCard component renders a card with a chart header and children content.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The unique identifier for the chart.
 * @param {HighchartsOptions} props.options - Highcharts options object.he Highcharts chart instance.
 * @returns {JSX.Element} The rendered ChartCard component.
 */
const ChartCard = function ChartCard({ id = undefined, options }) {
  const chartRef = useRef(null);
  const chart = chartRef.current?.chart;
  const [, setInit] = useState(false);

  useEffect(() => {
    // hack to force re-render to get the chart instance
    setInit(true);
  }, []);

  const openFullScreen = () => {
    chart.fullscreen.open();
  };

  const customSeriesButtons = options.series.map((series, index) => (
    <SeriesButton
      key={series?.name}
      onClick={() => {
        chart.series[index].setVisible(!chart.series[index].visible);
      }}
      className="series-button"
      visible={chart?.series[index]?.visible ?? true}
      color={chart?.series[index]?.color}
      borderColor={chart?.series[index]?.color}
    >
      {series.name}
    </SeriesButton>
  ));

  return (
    <div id={id} className="chart-card">
      <header className="chart-header">
        <div>
          <h2>{options?.title?.text}</h2>
          {options?.subtitle?.text ? <h3>{options.subtitle.text}</h3> : null}
        </div>
        <div>
          <button
            type="button"
            onClick={openFullScreen}
            aria-label="full screen"
            className="icon-button"
          >
            <Icons.Icon name="FullScreen" />
          </button>
        </div>
      </header>
      <figure>
        <HighchartsReact
          ref={chartRef}
          highcharts={Highcharts}
          options={options}
          aria-label={chart?.title}
        />
        <div className="chart-series-buttons">{customSeriesButtons}</div>
        <figcaption>{options.caption.text}</figcaption>
      </figure>
    </div>
  );
};

ChartCard.propTypes = {
  id: PropTypes.string,
  options: PropTypes.shape({
    title: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
    subtitle: PropTypes.shape({
      text: PropTypes.string,
    }),
    caption: PropTypes.shape({
      text: PropTypes.string,
    }),
    series: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        visible: PropTypes.bool,
      }),
    ).isRequired,
  }).isRequired,
};

export default ChartCard;
