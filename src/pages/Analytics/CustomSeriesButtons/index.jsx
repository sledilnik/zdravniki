/** @import * as Types from "../types" */

import PropTypes from 'prop-types';
import { useState } from 'react';

import SeriesButton from '../SeriesButton';

/**
 * CustomSeriesButtons component renders a list of series buttons for a Highcharts chart.
 * The buttons allow the user to toggle the visibility of each series.
 * @component
 * @param {Object} props - The properties object.
 * @param {Types.ChartRefProperty} props.chart - The Highcharts chart instance.
 * @returns {JSX.Element} The rendered CustomSeriesButtons component.
 * @example
 * return <CustomSeriesButtons chart={chart} />;
 */
const CustomSeriesButtons = function CustomSeriesButtons({ chart }) {
  const [buttonsVisibility, setButtonsVisibility] = useState(true);
  const seriesLabelsToShow = chart?.series?.filter(series => series.options.showInLegend !== false);

  if (!chart) {
    return null;
  }

  if (seriesLabelsToShow.length === 0) {
    return null;
  }

  const toggleSeriesVisibility = () => {
    chart?.series.forEach(series => {
      series.setVisible(!buttonsVisibility);
    });
    setButtonsVisibility(prev => !prev);
  };

  return (
    <>
      {seriesLabelsToShow.map((series, index, arr) => (
        <SeriesButton
          key={`${series?.name}${buttonsVisibility}`}
          onClick={() => {
            chart.series[index].setVisible(!chart.series[index].visible);
            setButtonsVisibility(() => chart.series.some(serie => serie.visible));
          }}
          onMouseEnter={() => {
            series.setState('hover');
            arr.forEach((s, i) => {
              if (i !== index) {
                s.setState('inactive');
              }
            });
          }}
          onMouseLeave={() => {
            arr.forEach(s => {
              s.setState('normal');
            });
          }}
          visible={buttonsVisibility}
          color={chart?.series[index]?.color}
          borderColor={chart?.series[index]?.color}
          variant="dynamic"
        >
          {series.name}
        </SeriesButton>
      ))}
      <SeriesButton type="button" onClick={toggleSeriesVisibility} toggleState={false}>
        {buttonsVisibility ? 'Skrij vse' : 'Pokaži vse'}
      </SeriesButton>
    </>
  );
};

CustomSeriesButtons.propTypes = {
  chart: PropTypes.shape({
    series: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        visible: PropTypes.bool,
        color: PropTypes.string,
        setVisible: PropTypes.func,
        // eslint-disable-next-line react/forbid-prop-types
        group: PropTypes.object,
      }),
    ),
  }).isRequired,
};

export default CustomSeriesButtons;
