import { FullCountDown, SimpleCountDown } from 'components/Shared/CountDown';
import PropTypes from 'prop-types';
import { getTimeDifference } from 'utils';

const AlertCountDown = function AlertCountDown({ time, variant = 'simple' }) {
  const { days, hours, minutes, seconds } = getTimeDifference(time);
  if (variant === 'simple') {
    return <SimpleCountDown days={days} hours={hours} minutes={minutes} seconds={seconds} />;
  }

  return <FullCountDown days={days} hours={hours} minutes={minutes} seconds={seconds} />;
};

AlertCountDown.defaultProps = {
  variant: 'simple',
};

AlertCountDown.propTypes = {
  time: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(['simple', 'full']),
};

export default AlertCountDown;
