import { memo } from 'react';

import CardContent from '@mui/material/CardContent';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import Accepts from './Accepts';
import * as Icons from 'components/Shared/Icons';
import * as Styled from './styles';
import SingleChart from 'components/Shared/CircleChart';

const DoctorCard = ({ doctor, handleRoomIconClick = () => {} }) => {
  const accepts = doctor.accepts === 'y';

  const availabilityText = new Intl.NumberFormat('sl-SL', {
    style: 'percent',
  }).format(doctor.availability);

  const tooltip = (
    <Stack sx={{ textAlign: 'center' }}>
      <Typography variant="caption">Glavarinski količnik</Typography>
      <Typography variant="body2">{parseFloat(doctor.load)}</Typography>
    </Stack>
  );

  return (
    <Styled.Card id={doctor.id} accepts={accepts.toString()}>
      <CardContent>
        <Styled.DataWrapper>
          <Styled.MainInfo sx={{ marginRight: 'auto' }}>
            <Styled.Title component="h2">{doctor.name}</Styled.Title>
            <Styled.SubTitle>{doctor.provider}</Styled.SubTitle>
            <Styled.Text>{doctor.fullAddress}</Styled.Text>
          </Styled.MainInfo>
          {/* <Divider orientation="horizontal" flexItem /> */}
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
              <IconButton onClick={() => console.log('Click room icon')}>
                <Icons.Icon name="MapMarker" />
              </IconButton>
              <IconButton onClick={() => console.log('Click room icon')}>
                <Icons.Icon name="IdCard" />
              </IconButton>
            </Styled.OtherInfoElement>
          </Styled.OtherInfo>
        </Styled.DataWrapper>
      </CardContent>
    </Styled.Card>
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  return prevProps.doctor.id === nextProps.doctor.id;
};
export default memo(DoctorCard, propsAreEqual);
