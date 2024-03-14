import { Box, Typography } from '@mui/material';
import i18n, { t } from 'i18next';
import PropTypes from 'prop-types';
import { memo } from 'react';

const INTL_LANGS = {
  en: 'en-GB',
  de: 'de-DE',
  sl: 'sl-SI',
  hr: 'hr-HR',
  it: 'it-IT',
  hu: 'hu-HU',
};

const ONE_DAY = 24 * 60 * 60 * 1000;

function getIntlFormatOptions(dateRangeInMilliseconds) {
  if (dateRangeInMilliseconds > ONE_DAY) {
    return {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
  }

  // for dev purposes
  return {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
}

const AlertContentHeader = function AlertContentHeader({ endDate, startDate }) {
  const sozialMarieTranslations = t('sozialMarie', { returnObjects: true });
  const intlDate = Intl.DateTimeFormat(
    INTL_LANGS[i18n.language],
    getIntlFormatOptions(endDate - startDate),
  );

  const dateRange = intlDate.formatRange(startDate, endDate);

  return (
    <>
      <Typography component="h2" fontWeight={600}>
        {sozialMarieTranslations.title}
      </Typography>

      <Typography
        component="time"
        dateTime={`${intlDate.format(startDate)}-${intlDate.format(endDate)}`}
        fontSize="0.875rem"
      >
        {dateRange}
      </Typography>
      <Box component="p" textAlign="left">
        {sozialMarieTranslations.aboutSozialMarie}
      </Box>
    </>
  );
};

AlertContentHeader.propTypes = {
  endDate: PropTypes.instanceOf(Date).isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
};

const areEqual = (prev, next) => prev.endDate === next.endDate && prev.startDate === next.startDate;
export default memo(AlertContentHeader, areEqual);
