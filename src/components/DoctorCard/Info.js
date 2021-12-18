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
        {doctor.name}
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

        <Stack direction="row" alignItems="center" spacing={1}>
          {doctor.phone && (
            <Tooltip title={doctor.phone}>
              {/* Shared.Link must be wrapped in Mui component or see:  https://mui.com/guides/composition/#caveat-with-refs */}
              <Box>
                <Shared.Link href={`tel:${doctor.phone}`} self>
                  <IconButton>
                    <Icons.Icon name="Phone" />
                  </IconButton>
                </Shared.Link>
              </Box>
            </Tooltip>
          )}
          <IconButton onClick={handleZoom}>
            <Icons.Icon name="MapMarker" />
          </IconButton>
          {path && (
            <Shared.LinkNoRel href={path} onClick={e => handleDoctorCard(e, false)}>
              <IconButton>
                <Icons.Icon name="IdCard" />
              </IconButton>
            </Shared.LinkNoRel>
          )}
          <Tooltip title={t('reportError.tooltip')}>
            <IconButton onClick={e => handleDoctorCard(e, true)}>
              <Icons.Icon name="ReportError" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </CardContent>
  );
};

// todo try React.memo; don't forget about locales
export default Info;
