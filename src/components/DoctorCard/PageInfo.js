import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { CardContent, Typography, Tooltip, Stack } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Accepts from './Accepts';
import SingleChart from 'components/Shared/CircleChart';

import * as Icons from 'components/Shared/Icons';
import * as Styled from './styles';
import * as Shared from './Shared';

import { toPercent } from './utils';

const PageInfo = ({ doctor }) => {
  const lng = localStorage.getItem('i18nextLng') || 'sl';
  const accepts = doctor.accepts === 'y';

  const [type, ageGroup] = doctor.type.split('-');

  const availabilityText = toPercent(doctor.availability, lng);
  const urlText = doctor.website && new URL(doctor.website).host;

  const navigate = useNavigate();
  // todo pass filters' state as second argument
  const handleBackButton = () => {
    navigate(`/${lng}`);
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
            <Shared.ConditionalLink
              to={doctor?.phone && `tel:${doctor.phone}`}
              self
              variant="body1"
            >
              {doctor.phone}
            </Shared.ConditionalLink>
          </Styled.PageInfo.LinkWrapper>
        )}

        <Stack sx={{ mt: { md: 2 } }}>
          <Tooltip title={<Shared.Tooltip.Availability />}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Styled.InfoWrapper>
                <Accepts accepts={accepts.toString()} />
              </Styled.InfoWrapper>
              <Styled.InfoWrapper>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <SingleChart size="26px" percent={doctor.availability} />
                  <Stack>
                    <Styled.Availability variant="caption">{availabilityText}</Styled.Availability>
                    <Styled.Availability variant="caption">
                      {t('headQuotient')} {doctor.load}
                    </Styled.Availability>
                  </Stack>
                </Stack>
              </Styled.InfoWrapper>
            </Stack>
          </Tooltip>
        </Stack>
      </div>
      <div>
        <Styled.PageInfo.BackWrapper direction="row">
          <Stack direction="row" alignItems="center" onClick={handleBackButton}>
            <IconButton sx={{ marginLeft: '-8px' }}>
              <Icons.Icon name="ArrowBack" />
            </IconButton>
            <Typography component="div" variant="body1">
              nazaj na imenik
            </Typography>
          </Stack>
        </Styled.PageInfo.BackWrapper>
      </div>
    </CardContent>
  );
};

export default PageInfo;
