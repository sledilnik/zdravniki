import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { toPercent } from '../utils';

export const HeadQuotient = function HeadQuotient({ load, note, date }) {
  const { t } = useTranslation();
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

export const Availability = function Availability({ override, date }) {
  const { t } = useTranslation();
  const hasOverride = override;

  return (
    <Stack>
      <Typography variant="caption">{t('doctorAvailability')}</Typography>
      {hasOverride && (
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
  const { t } = useTranslation();

  const { lng } = useParams();
  const hasOverride = doctor.availabilityOverride || doctor.note;

  const availabilityZZZS = toPercent(doctor.availabilityZZZS, lng);
  const availabilityOverride = toPercent(doctor.availabilityOverride, lng);

  return (
    <Stack sx={{ textAlign: 'left' }}>
      <Typography variant="caption">
        {t('changedOn')}
        {doctor.formatUpdatedAt(lng)}
      </Typography>
      {hasOverride && (
        <>
          <TooltipDivider />
          <Typography variant="caption">
            {doctor.note && <p>{doctor.note}</p>}
            {doctor.availabilityOverride && (
              <p>
                {t('doctorAvailabilityLabel')}: {availabilityZZZS} → {availabilityOverride}
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
