import PropTypes from 'prop-types';

export const SimpleCountDown = function SimpleCountDown({ date, days, hours, minutes, seconds }) {
  const d = days.toString();
  const h = hours.toString();
  const m = minutes.toString();
  const s = seconds.toString();

  return (
    <time dateTime={date}>
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
