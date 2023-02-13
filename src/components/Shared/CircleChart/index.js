// credits: https://medium.com/@pppped/how-to-code-a-responsive-circular-percentage-chart-with-svg-and-css-3632f8cd7705
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const CircleChartWrapper = styled('div')(({ theme, size, stroke, inner }) => {
  const strokeColor = stroke ?? theme.customColors.brand;

  let wrapperPosition = 'relative';
  let wrapperLeft = 'auto';
  let wrapperTop = 'auto';
  let margin = 0;
  let strokeWidth = 2.8;
  let strokeWidthGray = 3.8;
  if (inner) {
    wrapperPosition = 'absolute';
    wrapperLeft = '4px';
    wrapperTop = '4px';
    margin = '0 !important';
    strokeWidth = 4;
    strokeWidthGray = 4;
  }

  return {
    position: wrapperPosition,
    left: wrapperLeft,
    top: wrapperTop,
    margin,

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
      strokeWidth: strokeWidthGray,
    },
    'svg path:last-of-type': {
      fill: 'none',
      strokeWidth,
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

const CircleChart = function CircleChart({
  percent = 50,
  stroke,
  size = '2rem',
  noText = true,
  inner,
}) {
  return (
    <CircleChartWrapper size={size} stroke={stroke} inner={inner}>
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
  percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stroke: PropTypes.string,
  size: PropTypes.string,
  noText: PropTypes.bool,
  inner: PropTypes.bool,
};

CircleChart.defaultProps = {
  percent: 50,
  stroke: undefined,
  size: '2rem',
  noText: true,
  inner: false,
};

export default CircleChart;
