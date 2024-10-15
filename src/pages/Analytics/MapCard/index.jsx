/* eslint-disable react/require-default-props */
// Import TypeScript types from the highcharts module
/**
 * @typedef {import('highcharts/highmaps').Options} HighMapsOptions
 */

import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import HighMaps from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';

import * as Icons from 'components/Shared/Icons';
import { getIsRequestFullscreenSupported } from 'utils';
import CustomSeriesButtons from '../CustomSeriesButtons';
import Popover from '../CustomPopover';

import styles from '../ChartCard/ChartCard.module.css';
import stylesIconButton from '../IconButton.module.css';

/**
 * MapCard component renders a HighMaps chart with optional series buttons and fullscreen/print functionality.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} [props.id] - The id for the MapCard container.
 * @param {HighMapsOptions} props.options - The HighMaps options object.
 * @param {boolean} [props.showSeriesButtons=false] - Flag to show or hide series buttons.
 * @returns {JSX.Element} The rendered MapCard component.
 */
const MapCard = function MapCard({ id = undefined, options, showSeriesButtons = false }) {
  const [chartOptions] = useState(options);
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

  const printChart = () => {
    chart.print();
  };

  const isRequestFullscreenSupported = getIsRequestFullscreenSupported(document.documentElement);

  return (
    <div id={id} className={styles.ChartCard}>
      <header className={styles.ChartHeader}>
        <div>
          <h2>{options?.title?.text}</h2>
          {options?.subtitle?.text ? <h3>{options.subtitle.text}</h3> : null}
        </div>

        <Popover
          placement="bottom-start"
          triggerClassname={stylesIconButton.IconButton}
          options={[
            isRequestFullscreenSupported
              ? {
                  label: 'Full Screen',
                  onClick: openFullScreen,
                  Icon: Icons.Icon.bind(null, { name: 'FullScreen' }),
                }
              : null,
            {
              label: 'Print',
              onClick: printChart,
              Icon: Icons.Icon.bind(null, { name: 'Print' }),
            },
          ]}
        >
          <Icons.Icon name="VerticalDots" aria-label="more actions" />
        </Popover>
      </header>
      <figure className={styles.ChartFigure}>
        <HighchartsReact
          ref={chartRef}
          highcharts={HighMaps}
          constructorType="mapChart"
          options={chartOptions}
          aria-label={chart?.title}
        />
        {showSeriesButtons ? (
          <div className={styles.ChartSeriesButtons}>
            <CustomSeriesButtons chart={chart} />
          </div>
        ) : null}
        <figcaption>{options.caption.text}</figcaption>
      </figure>
    </div>
  );
};

MapCard.propTypes = {
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
  showSeriesButtons: PropTypes.bool,
};

export default MapCard;
