import { useNavigate, useLocation } from 'react-router-dom';
import { CardContent, Typography, Tooltip, Stack } from '@mui/material';
import { t } from 'i18next';

import IconButton from '@mui/material/IconButton';
import { useFilter } from 'context/filterContext';
import SingleChart from 'components/Shared/CircleChart';

import * as Icons from 'components/Shared/Icons';
import { MAP } from 'const';
import Accepts from './Accepts';
import * as Styled from './styles';
import * as Shared from './Shared';

import { toPercent } from './utils';

const PageInfo = function PageInfo({ doctor }) {
  const { searchValue } = useFilter();
  const { state } = useLocation();

  const lng = localStorage.getItem('i18nextLng') || 'sl';
  const accepts = doctor.accepts === 'y';

  const [type, ageGroup] = doctor.type.split('-');

  const availabilityText = toPercent(doctor.availability, lng);
  const urlText = doctor.website && new URL(doctor.website).host;

  const navigate = useNavigate();
  // todo pass filters' state as second argument
  const handleBackButton = () => {
    navigate(`/${lng}`, {
      state: {
        searchValue,
        zoom: state?.zoom ?? MAP.ZOOM,
        center: state?.center ?? MAP.GEO_LOCATION.SL_CENTER,
      },
    });
  };

  return (
    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <Typography component="h1" variant="h1">
          {doctor.name}
        </Typography>
        <Shared.DoubleChip type={type} ageGroup={ageGroup} />
        <Typography component="h2" variant="h2">
          {doctor.provider}
        </Typography>
        <Typography component="address" variant="body2" sx={{ mb: { xs: 1, sm: 1.5, md: 2 } }}>
          {doctor.fullAddress}
        </Typography>

        {urlText && (
          <Styled.PageInfo.LinkWrapper direction="row" alignItems="center" spacing={1}>
            <Typography component="div" variant="body1">
              <Icons.Icon name="Link" />
            </Typography>
            <Shared.ConditionalLink to={doctor.website} variant="body1">
              {urlText}
            </Shared.ConditionalLink>
          </Styled.PageInfo.LinkWrapper>
        )}

        {doctor.phone && (
          <Styled.PageInfo.LinkWrapper direction="row" alignItems="center" spacing={1}>
            <Typography component="div" variant="body1">
              <Icons.Icon name="Phone" />
            </Typography>
            <Shared.ConditionalLink to={doctor.phone && `tel:${doctor.phone}`} self variant="body1">
              {doctor.phone}
            </Shared.ConditionalLink>
          </Styled.PageInfo.LinkWrapper>
        )}

        <Stack sx={{ mt: { md: 2 } }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title={<Shared.Tooltip.HeadQuotient load={doctor.load} />}>
              <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
                <Accepts accepts={accepts} />
              </Styled.InfoWrapper>
            </Tooltip>
            <Tooltip title={<Shared.Tooltip.Availability />}>
              <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
                <SingleChart size="26px" percent={doctor.availability} />
                <Styled.Availability variant="caption">{availabilityText}</Styled.Availability>
              </Styled.InfoWrapper>
            </Tooltip>
          </Stack>
        </Stack>
      </div>
      <div>
        <Styled.PageInfo.BackWrapper direction="row">
          <Stack direction="row" alignItems="center" onClick={handleBackButton}>
            <IconButton sx={{ marginLeft: '-8px' }}>
              <Icons.Icon name="ArrowBack" />
            </IconButton>
            <Typography component="div" variant="body1">
              {t('backToHome')}
            </Typography>
          </Stack>
        </Styled.PageInfo.BackWrapper>
      </div>
    </CardContent>
  );
};

export default PageInfo;
