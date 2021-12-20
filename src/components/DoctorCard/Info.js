import { useNavigate, useParams } from 'react-router-dom';
import { CardContent, Typography, Tooltip, IconButton, Stack, Box } from '@mui/material';
import slugify from 'slugify';

import { useLeafletContext } from 'context/leafletContext';
import * as Icons from 'components/Shared/Icons';
import SingleChart from 'components/Shared/CircleChart';
import { t } from 'i18next';
import Accepts from './Accepts';
import * as Styled from './styles';
import * as Shared from './Shared';

import { toPercent } from './utils';

const Info = function Info({ doctor, handleZoom = () => {} }) {
  const { lng } = useParams();
  const { map } = useLeafletContext();
  const accepts = doctor.accepts === 'y';
  const availabilityText = toPercent(doctor.availability, lng);

  const navigate = useNavigate();

  const drPath = doctor?.type;
  const slug = slugify(doctor?.name?.toLowerCase());
  let path = `/${lng}/${drPath}/${slug}`;
  const handleDoctorCard = (event, isReportError) => {
    event.preventDefault();
    if (isReportError) {
      path = `/${lng}/${drPath}/${slug}/edit`;
    }
    return navigate(path, { state: { zoom: map?.getZoom(), center: map?.getCenter() } });
  };

  return (
    <CardContent sx={{ padding: `0 !important` }}>
      <Typography component="h2" variant="h2">
        <Shared.LinkNoRel href={path} onClick={e => handleDoctorCard(e, false)}>
          {doctor.name}
        </Shared.LinkNoRel>
      </Typography>
      <Shared.ConditionalLink to={doctor.website} component="h3" variant="h3">
        {doctor.provider}
      </Shared.ConditionalLink>
      <Typography component="address" variant="body2">
        {doctor.fullAddress}
      </Typography>

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title={<Shared.Tooltip.HeadQuotient load={doctor.load} />}>
            <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
              <Accepts accepts={accepts} />
            </Styled.InfoWrapper>
          </Tooltip>
          <Tooltip title={<Shared.Tooltip.Availability />}>
            <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
              <SingleChart size="26px" percent={doctor.availability} />
              <Stack>
                <Styled.Availability variant="caption">{availabilityText}</Styled.Availability>
              </Stack>
            </Styled.InfoWrapper>
          </Tooltip>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" className={'card-toolbar'} spacing={1}>
        <Stack direction="row" className={'card-toolbar__left'}>
          {doctor.phone && (
              <Tooltip title={doctor.phone}>
                <IconButton href={`tel:${doctor.phone}`} self>
                  <Icons.Icon name="PhoneBig" />
                </IconButton>
              </Tooltip>
          )}
          {!doctor.phone && (
              <Tooltip title={t('doctorCard.noPhone')}>
                <IconButton className={'icon--disabled'}>
                  <Icons.Icon name="NoPhoneBig" />
                </IconButton>
              </Tooltip>
          )}
          <Tooltip title={t('doctorCard.showOnMap')}>
            <IconButton onClick={handleZoom}>
              <Icons.Icon name="MapMarker" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('reportError.tooltip')}>
            <IconButton onClick={e => handleDoctorCard(e, true)}>
              <Icons.Icon name="ReportError" />
            </IconButton>
          </Tooltip>
        </Stack>
        {path && (
            <Shared.LinkNoRel href={path} onClick={e => handleDoctorCard(e, false)}>
              {t('doctorCard.more')}
              <Icons.Icon name="More" />
            </Shared.LinkNoRel>
        )}
      </Stack>
    </CardContent>
  );
};

// todo try React.memo; don't forget about locales
export default Info;
