import PropTypes from 'prop-types';
import SeriesButton from './SeriesButton';

const CustomSeriesButtons = function CustomSeriesButtons({ chart }) {
  if (!chart) {
    return null;
  }

  return chart.series.map((series, index) => (
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
};

CustomSeriesButtons.propTypes = {
  chart: PropTypes.shape({
    series: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        visible: PropTypes.bool,
        color: PropTypes.string,
        setVisible: PropTypes.func,
      }),
    ),
    fullscreen: PropTypes.shape({
      open: PropTypes.func,
    }),
  }).isRequired,
};

export default CustomSeriesButtons;
