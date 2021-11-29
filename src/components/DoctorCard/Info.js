import { useNavigate } from 'react-router-dom';
import { CardContent, Stack, Typography, Tooltip, IconButton, Link } from '@mui/material';
import Accepts from './Accepts';
import * as Icons from 'components/Shared/Icons';
import * as Styled from './styles';
import SingleChart from 'components/Shared/CircleChart';
import { t } from 'i18next';

const Info = ({ doctor, handleZoom = () => {} }) => {
  const accepts = doctor.accepts === 'y';

  const availabilityText = new Intl.NumberFormat('sl-SL', {
    style: 'percent',
  }).format(doctor.availability);

  const tooltip = (
    <Stack sx={{ textAlign: 'center' }}>
      <Typography variant="caption">{t('headQuotient')}</Typography>
      <Typography variant="body2">{parseFloat(doctor.load)}</Typography>
    </Stack>
  );

  const navigate = useNavigate();
  const lng = localStorage.getItem('i18nextLng') || 'sl';

  const handleDoctorCard = doctor => {
    let type;
    switch (doctor.type) {
      case 'gp':
      case 'gp-y':
        type = 'zdravnik';
        break;
      case 'den':
      case 'den-s':
      case 'den-y':
        type = 'zobozdravnik';
        break;
      case 'gyn':
        type = 'ginekolog';
        break;
      default:
        type = 'undefined';
    }
    navigate(`/${lng}/${type}/${doctor?.name?.toLowerCase().replaceAll(' ', '-')}`);
  };

  const ConditionalLink = ({ children, to, condition }) =>
    !!condition && to ? (
      <Styled.SubTitle>
        <Link rel="noopener noreferrer" target="_blank" href={to}>
          {children}
        </Link>
      </Styled.SubTitle>
    ) : (
      <Styled.SubTitle>{children}</Styled.SubTitle>
    );

  return (
    <CardContent>
      <Styled.DataWrapper>
        <Styled.MainInfo sx={{ marginRight: 'auto' }}>
          <Styled.Title component="h2">{doctor.name}</Styled.Title>
          <ConditionalLink to={doctor.website} condition={doctor.website !== ''}>
            {doctor.provider}
          </ConditionalLink>
          <ConditionalLink to={`tel:${doctor.phone}`} condition={doctor.phone !== ''}>
            {doctor.phone}
          </ConditionalLink>
          <Styled.Text>{doctor.fullAddress}</Styled.Text>
        </Styled.MainInfo>
        <Styled.OtherInfo>
          <Styled.OtherInfoElement>
            <Accepts accepts={accepts.toString()} />
            <Tooltip title={tooltip}>
              <Styled.AvailabilityInfo>
                <SingleChart size="26px" percent={doctor.availability} />
                <Styled.Availability variant="caption">{availabilityText}</Styled.Availability>
              </Styled.AvailabilityInfo>
            </Tooltip>
          </Styled.OtherInfoElement>
          <Styled.OtherInfoElement>
            <IconButton onClick={handleZoom}>
              <Icons.Icon name="MapMarker" />
            </IconButton>
            <IconButton onClick={() => handleDoctorCard(doctor)}>
              <Icons.Icon name="IdCard" />
            </IconButton>
          </Styled.OtherInfoElement>
        </Styled.OtherInfo>
      </Styled.DataWrapper>
    </CardContent>
  );
};

export default Info;
