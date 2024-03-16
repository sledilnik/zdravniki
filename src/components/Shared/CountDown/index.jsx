import PropTypes from 'prop-types';
import { getTimeDurationAttrValue } from 'utils';

export const SimpleCountDown = function SimpleCountDown({ days, hours, minutes, seconds }) {
  const d = days.toString();
  const h = hours.toString();
  const m = minutes.toString();
  const s = seconds.toString();

  const timeDuration = getTimeDurationAttrValue({ days, hours, minutes, seconds });

  return (
    <time dateTime={timeDuration} aria-live="polite">
      {d.padStart(2, '0')}:{h.padStart(2, '0')}:{m.padStart(2, '0')}:{s.padStart(2, '0')}
    </time>
  );
};

SimpleCountDown.propTypes = {
  days: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};
