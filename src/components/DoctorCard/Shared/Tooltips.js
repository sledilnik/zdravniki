import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { t } from 'i18next';
import { styled } from '@mui/material/styles';

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

export const Updated = function Updated({ date, note }) {
  return (
    <Stack sx={{ textAlign: 'left' }}>
      <Typography variant="caption">
        {t('changedOn')}
        {date}
      </Typography>
      <Typography variant="body3">{note && <p>{note}</p>}</Typography>
    </Stack>
  );
};

export const TooltipDivider = styled(Divider)(() => ({
  borderColor: 'rgba(255,255,255,0.5)',
  margin: '5px 0',
}));
