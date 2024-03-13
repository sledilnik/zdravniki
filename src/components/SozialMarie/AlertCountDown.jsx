import { t } from 'i18next';
import PropTypes from 'prop-types';
import { getTimeDifference } from 'utils';

const AlertCountDown = function AlertCountDown({ date, time }) {
  const sozialMarieTranslations = t('sozialMarie', { returnObjects: true });
  const { days, hours, minutes, seconds } = getTimeDifference(time);
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

AlertCountDown.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  time: PropTypes.number.isRequired,
};

export default AlertCountDown;
