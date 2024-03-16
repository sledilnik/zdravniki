import PropTypes from 'prop-types';
import i18n from 'i18next';
import { getTimeDurationAttrValue } from 'utils';

const INTL_LANGS = {
  en: 'en-GB',
  de: 'de-DE',
  sl: 'sl-SI',
  hr: 'hr-HR',
  it: 'it-IT',
  hu: 'hu-HU',
};

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

export const FullCountDown = function FullCountDown({ days, hours, minutes, seconds }) {
  const rtf = new Intl.RelativeTimeFormat(INTL_LANGS[i18n.language], {
    numeric: 'always',
    style: 'narrow',
  });

  const daysParts = rtf.formatToParts(days, 'day');
  const hoursParts = rtf.formatToParts(hours, 'hour');
  const minutesParts = rtf.formatToParts(minutes, 'minute');
  const secondsParts = rtf.formatToParts(seconds, 'second');

  const value = [daysParts, hoursParts, minutesParts, secondsParts]
    .map(part => `${part[1].value} ${part[2].value}`)
    .join(', ');

  const timeDuration = getTimeDurationAttrValue({ days, hours, minutes, seconds });

  return (
    <time dateTime={timeDuration} aria-live="polite">
      {value}
    </time>
  );
};

FullCountDown.propTypes = {
  days: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};
