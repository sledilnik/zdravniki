import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { toPercent } from '../utils';

const getAcceptText = (accepts, translationFunc) =>
  accepts === 'y' ? translationFunc('accepts') : translationFunc('rejects');

export const HeadQuotient = function HeadQuotient({ load, note, date, hasOverride }) {
  const { t } = useTranslation();

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

export const Availability = function Availability({ date, hasOverride }) {
  const { t } = useTranslation();

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

export const Updated = function Updated({
  date,
  acceptsOverride,
  availabilityOverride,
  acceptsZZZS,
  availabilityZZZS,
  note,
}) {
  const { t } = useTranslation();

  const { lng } = useParams();

  const acceptsOverrideText = getAcceptText(acceptsOverride, t);
  const acceptsZZZSText = getAcceptText(acceptsZZZS, t);

  const availabilityZZZSText = toPercent(availabilityZZZS, lng);
  const availabilityOverrideText = toPercent(availabilityOverride, lng);

  return (
    <Stack sx={{ textAlign: 'left' }}>
      <Typography variant="caption">
        {t('changedOn')}
        {date}
      </Typography>
      <TooltipDivider />
      {note && <Typography variant="caption">{note}</Typography>}
      {availabilityOverride && (
        <Typography variant="caption">
          {t('doctorAvailabilityLabel')}: {availabilityZZZSText} → {availabilityOverrideText}
        </Typography>
      )}
      {acceptsOverride && (
        <Typography variant="caption">
          {acceptsZZZSText} → {acceptsOverrideText}
        </Typography>
      )}
    </Stack>
  );
};

export const TooltipDivider = styled(Divider)(() => ({
  borderColor: 'rgba(255,255,255,0.5)',
  margin: '5px 0',
}));
