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
  date: PropTypes.instanceOf(Date).isRequired,
  days: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};

export const CountDown = function CountDown({ date, days, hours, minutes, seconds }) {
  if (days > 0) {
    return <time dateTime={date}>{days}</time>;
  }

  if (hours > 0) {
    return (
      <time dateTime={date}>
        {hours}:{minutes}
      </time>
    );
  }

  return (
    <time dateTime={date}>
      {minutes}:{seconds}
    </time>
  );
};

CountDown.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  days: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};
