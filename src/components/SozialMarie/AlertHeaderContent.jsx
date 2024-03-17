import { Box, Typography } from '@mui/material';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { memo } from 'react';

import { ONE_DAY_IN_MILLISECONDS } from 'const/time';

const INTL_LANGS = {
  en: 'en-GB',
  de: 'de-DE',
  sl: 'sl-SI',
  hr: 'hr-HR',
  it: 'it-IT',
  hu: 'hu-HU',
};

function getIntlFormatOptions(dateRangeInMilliseconds) {
  if (dateRangeInMilliseconds > ONE_DAY_IN_MILLISECONDS) {
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

const AlertContentHeader = function AlertContentHeader({ endDate, startDate, lang }) {
  const sozialMarieTranslations = t('sozialMarie', { returnObjects: true });
  const intlDate = Intl.DateTimeFormat(INTL_LANGS[lang], getIntlFormatOptions(endDate - startDate));

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
  lang: PropTypes.string.isRequired,
};

const areEqual = (prev, next) =>
  prev.endDate === next.endDate && prev.startDate === next.startDate && prev.lang === next.lang;
export default memo(AlertContentHeader, areEqual);
