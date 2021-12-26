import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { t } from 'i18next';

export const HeadQuotient = function HeadQuotient({ load, note, date }) {
  return (
    <Stack sx={{ textAlign: 'center' }}>
      <Typography variant="caption">{t('headQuotient')}</Typography>
      <Typography variant="body2">{parseFloat(load)}</Typography>
      <Typography variant="body3">{note}</Typography>
      <Typography variant="body3">
        {date && (
          <p>
            {t('changedOn')}
            {date}
          </p>
        )}
      </Typography>
    </Stack>
  );
};

export const Availability = function Availability({ date }) {
  return (
    <Stack sx={{ textAlign: 'center' }}>
      <Typography variant="caption">{t('doctorAvailability')}</Typography>
      <Typography variant="body3">
        {date && (
          <p>
            {t('changedOn')}
            {date}
          </p>
        )}
      </Typography>
    </Stack>
  );
};

export const Updated = function Updated({ date, note }) {
  return (
    <Stack sx={{ textAlign: 'center' }}>
      <Typography variant="caption">
        {t('changedOn')}
        {date}
      </Typography>
      <Typography variant="body3">{note && <p>{note}</p>}</Typography>
    </Stack>
  );
};
