/* eslint-disable react/require-default-props */
/** @import * as Types from "../../types" */

import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import HighMaps from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';

import * as Icons from 'components/Shared/Icons';
import { getIsRequestFullscreenSupported } from 'utils';
import CustomSeriesButtons from '../../CustomSeriesButtons';

import styles from '../Card.module.css';
import ChartHeader from '../ChartHeader';

/**
 * MapCard component renders a HighMaps chart with optional series buttons and fullscreen/print functionality.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} [props.id] - The id for the MapCard container.
 * @param {Types.HighMapsOptions} props.options - The HighMaps options object.
 * @param {boolean} [props.showSeriesButtons=false] - Flag to show or hide series buttons.
 * @returns {JSX.Element} The rendered MapCard component.
 */
const MapCard = function MapCard({ id = undefined, options, showSeriesButtons = false }) {
  const [chartOptions] = useState(options);
  /** @type {React.RefObject<(Types.HighchartsReactRefObject | null)>} */
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
    <article id={id} className={styles.Card}>
      <ChartHeader
        title={options?.title?.text}
        subtitle={options?.subtitle?.text}
        popoverOptions={[
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
      />

      <figure className={styles.Figure}>
        <HighchartsReact
          ref={chartRef}
          highcharts={HighMaps}
          constructorType="mapChart"
          options={chartOptions}
          aria-label={chart?.title}
        />
        {showSeriesButtons ? (
          <div className={styles.SeriesButtons}>
            <CustomSeriesButtons chart={chart} />
          </div>
        ) : null}
        <figcaption className="highcharts-description">{options.caption.text}</figcaption>
      </figure>
    </article>
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
