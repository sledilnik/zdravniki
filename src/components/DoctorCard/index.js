import { memo } from 'react';

import CardContent from '@mui/material/CardContent';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import Divider from '@mui/material/Divider';

import * as Icons from 'components/Shared/Icons';
import * as Styled from './styles';

// import { SIZES } from 'const';

const DoctorCard = ({ doctor, handleRoomIconClick = () => {} }) => {
  // const upXSWidth = json2mq({ screen: true, minWidth: SIZES.DEVICES.xs });
  // const isUpXS = useMediaQuery(upXSWidth);

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
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Stack>
            <Typography variant="body2">{doctor.name}</Typography>
            <Typography variant="caption">{doctor.provider}</Typography>
            <Typography variant="caption">{doctor.fullAddress}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            {accepts && (
              <Stack direction="row" sx={{ alignItems: 'center' }}>
                <Icons.CheckCircleOutlineIcon color="success" />
                <Typography color="success" variant="body2">
                  SPREJEMA
                </Typography>
              </Stack>
            )}
            {!accepts && (
              <Stack direction="row" sx={{ alignItems: 'center' }}>
                <Icons.BlockIcon color="error" />
                <Typography color="error" variant="body2">
                  NE SPREJEMA
                </Typography>
              </Stack>
            )}
            <Tooltip title={tooltip}>
              <Stack direction="row" sx={{ alignItems: 'center' }}>
                <Icons.GroupsIcon />
                <Typography variant="body2">{availabilityText}</Typography>
              </Stack>
            </Tooltip>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <IconButton onClick={() => console.log('Click room icon')}>
              <Icons.RoomIcon />
            </IconButton>
            <IconButton onClick={() => console.log('Click room icon')}>
              <Icons.ContactPageIcon />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Styled.Card>
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  return prevProps.doctor.id === nextProps.doctor.id;
};
export default memo(DoctorCard, propsAreEqual);
