import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { t } from 'i18next';

export const HeadQuotient = ({ load }) => {
  return (
    <Stack sx={{ textAlign: 'center' }}>
      <Typography variant="caption">{t('headQuotient')}</Typography>
      <Typography variant="body2">{parseFloat(load)}</Typography>
    </Stack>
  );
};

export const Availability = () => {
  return (
    <Stack sx={{ textAlign: 'left' }}>
      <Typography variant="caption">{t('doctorAvailability')}</Typography>
    </Stack>
  );
};
