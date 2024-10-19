/* eslint-disable react/require-default-props */
// Import TypeScript types from the highcharts module
/**
 * @typedef {import('highcharts').Options} HighchartsOptions
 */

import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import * as Icons from 'components/Shared/Icons';
import { getIsRequestFullscreenSupported } from 'utils';
import CustomSeriesButtons from '../CustomSeriesButtons';
import Popover from '../CustomPopover';

import styles from './ChartCard.module.css';
import stylesIconButton from '../IconButton.module.css';

/**
 * ChartCard component renders a card with a chart header and children content.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The unique identifier for the chart.
 * @param {HighchartsOptions} props.options - Highcharts options object.he Highcharts chart instance.
 * @returns {JSX.Element} The rendered ChartCard component.
 */
const ChartCard = function ChartCard({ id = undefined, options }) {
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
    <article id={id} className={styles.ChartCard}>
      <header className={styles.ChartHeader}>
        <div>
          <h3>{options?.title?.text}</h3>
          {options?.subtitle?.text ? <p>{options.subtitle.text}</p> : null}
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
          highcharts={Highcharts}
          options={chartOptions}
          aria-label={chart?.title}
        />
        <div className={styles.ChartSeriesButtons}>
          <CustomSeriesButtons chart={chart} />
        </div>
        <figcaption>{options.caption.text}</figcaption>
      </figure>
    </article>
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
