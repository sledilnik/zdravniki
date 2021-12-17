// credits: https://medium.com/@pppped/how-to-code-a-responsive-circular-percentage-chart-with-svg-and-css-3632f8cd7705
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const CircleChartWrapper = styled('div')(({ theme, size, stroke }) => {
  const strokeColor = stroke ?? theme.customColors.brand;

  return {
    svg: {
      display: 'block',
      margin: '10px auto',
      width: size,
      height: size,
      stroke: strokeColor,
    },

    'svg path:first-of-type': {
      fill: 'none',
      stroke: '#eee',
      strokeWidth: 3.8,
    },
    'svg path:last-of-type': {
      fill: 'none',
      strokeWidth: 2.8,
      strokeLinecap: 'round',
      animation: 'progress 1s ease-out forwards',
    },
    'svg text': {
      fill: '#666',
      fontFamily: 'inherit',
      fontSize: '0.5em',
      textAnchor: 'middle',
    },
    '@keyframes progress': {
      0: {
        strokeDasharray: '0 100',
      },
    },
  };
});

const CircleChart = function CircleChart({ percent = 50, stroke, size = '2rem', noText = true }) {
  return (
    <CircleChartWrapper size={size} stroke={stroke}>
      <svg viewBox="0 0 36 36">
        <path
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          strokeDasharray={`${+percent * 100} 100`}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        {!noText && (
          <text x="18" y="20.35">
            {`${percent}%`}
          </text>
        )}
      </svg>
    </CircleChartWrapper>
  );
};

CircleChart.propTypes = {
  percent: PropTypes.number,
  stroke: PropTypes.bool,
  size: PropTypes.string,
  noText: PropTypes.bool,
};

CircleChart.defaultProps = {
  percent: 50,
  stroke: false,
  size: '2rem',
  noText: true,
};

export default CircleChart;
