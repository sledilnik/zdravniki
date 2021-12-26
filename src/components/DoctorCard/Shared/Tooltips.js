import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { t } from 'i18next';

export const HeadQuotient = function HeadQuotient({ load, note, date }) {
  return (
    <Stack sx={{ textAlign: 'center' }}>
      <Typography variant="caption">{t('headQuotient')}</Typography>
      <Typography variant="body2">{parseFloat(load)}</Typography>
      <Divider orientation="horizontal" flexItem sx={{ borderColor: '#fff' }} />
      <Stack sx={{ textAlign: 'start' }}>
        <Typography variant="caption">{note}</Typography>
        <Typography variant="caption">
          {t('changedOn')} {date}
        </Typography>
      </Stack>
    </Stack>
  );
};

export const Availability = function Availability({ date }) {
  return (
    <Stack>
      <Typography variant="caption">{t('doctorAvailability')}</Typography>
      <Divider orientation="horizontal" flexItem sx={{ borderColor: '#fff' }} />
      <Typography variant="caption">
        {t('changedOn')} {date}
      </Typography>
    </Stack>
  );
};
