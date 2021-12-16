import { useNavigate } from 'react-router-dom';
import { CardContent, Typography, Tooltip, IconButton, Stack } from '@mui/material';
import slugify from 'slugify';

import { useLeafletContext } from 'context/leafletContext';
import * as Icons from 'components/Shared/Icons';
import SingleChart from 'components/Shared/CircleChart';
import Accepts from './Accepts';
import * as Styled from './styles';
import * as Shared from './Shared';

import { DoctorTypeTranslate } from './dicts';
import { toPercent } from './utils';

const Info = function Info({ doctor, handleZoom = () => {} }) {
  const lng = localStorage.getItem('i18nextLng') || 'sl';
  const { map } = useLeafletContext();
  const accepts = doctor.accepts === 'y';
  const availabilityText = toPercent(doctor.availability, lng);

  const navigate = useNavigate();

  const drPath = DoctorTypeTranslate?.[doctor?.type];
  const slug = slugify(doctor?.name?.toLowerCase());
  const path = drPath && `/${lng}/${drPath}/${slug}`;

  const handleDoctorCard = event => {
    event.preventDefault();
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
              <Shared.Link href={`tel:${doctor.phone}`} self>
                <IconButton>
                  <Icons.Icon name="Phone" />
                </IconButton>
              </Shared.Link>
            </Tooltip>
          )}
          <IconButton onClick={handleZoom}>
            <Icons.Icon name="MapMarker" />
          </IconButton>
          {path && (
            <Shared.LinkNoRel href={path} onClick={handleDoctorCard}>
              <IconButton>
                <Icons.Icon name="IdCard" />
              </IconButton>
            </Shared.LinkNoRel>
          )}
        </Stack>
      </Stack>
    </CardContent>
  );
};

// todo try React.memo; don't forget about locales
export default Info;
