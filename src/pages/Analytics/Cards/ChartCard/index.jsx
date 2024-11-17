/* eslint-disable react/require-default-props */
/** @import * as Types from "../../types" */

import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import * as Icons from 'components/Shared/Icons';
import { getIsRequestFullscreenSupported } from 'utils';

import CustomSeriesButtons from '../../CustomSeriesButtons';

import styles from '../Card.module.css';
import ChartHeader from '../ChartHeader';

/**
 * ChartCard component renders a card with a chart header and children content.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The unique identifier for the chart.
 * @param {Types.HighchartsOptions} props.options - Highcharts options object.he Highcharts chart instance.
 * @returns {JSX.Element} The rendered ChartCard component.
 */
const ChartCard = function ChartCard({ id = undefined, options }) {
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
          highcharts={Highcharts}
          options={chartOptions}
          aria-label={chart?.title}
        />
        <div className={styles.SeriesButtons}>
          <CustomSeriesButtons chart={chart} />
        </div>
        <figcaption className="highcharts-description">{options?.caption?.text}</figcaption>
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
