import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { t } from 'i18next';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

export const HeadQuotient = function HeadQuotient({ load, note, date }) {
  const hasOverride = note;

  return (
    <Stack sx={{ textAlign: 'center' }}>
      <Typography variant="caption">{t('headQuotient')}</Typography>
      <Typography variant="body2">{parseFloat(load)}</Typography>
      {hasOverride && (
        <>
          <TooltipDivider />
          <Stack sx={{ textAlign: 'start' }}>
            {note && <Typography variant="caption">{note}</Typography>}
            {date && (
              <Typography variant="caption">
                {t('changedOn')} {date}
              </Typography>
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export const Availability = function Availability({ date }) {
  return (
    <Stack>
      <Typography variant="caption">{t('doctorAvailability')}</Typography>
      {date && (
        <>
          <TooltipDivider />
          <Typography variant="caption">
            {t('changedOn')} {date}
          </Typography>
        </>
      )}
    </Stack>
  );
};

export const Updated = function Updated({ doctor }) {
  const { lng } = useParams();
  const hasOverride = doctor.availabilityOverride || doctor.note;

  return (
    <Stack sx={{ textAlign: 'left' }}>
      <Typography variant="caption">
        {t('changedOn')}
        {doctor.formatUpdatedAt(lng)}
      </Typography>
      {hasOverride && (
        <>
          <TooltipDivider />
          <Typography variant="body3">
            {doctor.note && <p>{doctor.note}</p>}
            {doctor.availabilityOverride && (
              <p>
                {t('doctorAvailabilityLabel')}: {doctor.availabilityZZZS * 100}% →{' '}
                <strong>{doctor.availabilityOverride * 100}%</strong>
              </p>
            )}
          </Typography>
        </>
      )}
    </Stack>
  );
};

export const TooltipDivider = styled(Divider)(() => ({
  borderColor: 'rgba(255,255,255,0.5)',
  margin: '5px 0',
}));
