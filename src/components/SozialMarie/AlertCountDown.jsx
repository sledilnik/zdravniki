import { SimpleCountDown } from 'components/Shared/CountDown';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { getTimeDifference } from 'utils';

const AlertCountDown = function AlertCountDown({ date, time, variant = 'simple' }) {
  const { days, hours, minutes, seconds } = getTimeDifference(time);
  if (variant === 'simple') {
    return <SimpleCountDown days={days} hours={hours} minutes={minutes} seconds={seconds} />;
  }

  const sozialMarieTranslations = t('sozialMarie', { returnObjects: true });

  const daysText = days >= 1 ? `${days} ${t('time.day', { count: days })}, ` : '';
  const hoursText = hours >= 1 ? `${hours} ${t('time.hour', { count: hours })}, ` : '';
  const minutesText =
    minutes >= 1
      ? `${minutes} ${t('time.minute', { count: minutes })} ${sozialMarieTranslations.and} `
      : '';

  return (
    <time dateTime={date}>
      {daysText}
      {hoursText}
      {minutesText}
      {seconds} {t('time.second', { count: seconds })}
    </time>
  );
};

AlertCountDown.defaultProps = {
  variant: 'simple',
};

AlertCountDown.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  time: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(['simple', 'full']),
};

export default AlertCountDown;
