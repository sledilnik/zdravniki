import { memo, useLayoutEffect, useState } from 'react';
import json2mq from 'json2mq';

import useMediaQuery from '@mui/material/useMediaQuery';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';

import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { ExpandMore } from '../Shared';
import { RoomIcon } from 'components/Shared/Icons';
import DoctorMap from './Map';
import SubHeader from './SubHeader';
import * as Styled from './styles';

import { SIZES } from 'const';

const DoctorCard = ({ doctor, handleRoomIconClick = () => {} }) => {
  const upXSWidth = json2mq({ screen: true, minWidth: SIZES.DEVICES.xs });
  const isUpXS = useMediaQuery(upXSWidth);
  const [expanded, setExpanded] = useState(isUpXS);

  useLayoutEffect(() => {
    setExpanded(isUpXS);
  }, [isUpXS]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const accepts = doctor.accepts === 'y';
  const color = accepts ? 'success.contrastText' : 'error.contrastText';
  const bgColor = accepts ? 'success.main' : 'error.main';

  const cardMedia = (
    <CardMedia component="div">
      <DoctorMap height="150px" doctor={doctor} handleRoomIconClick={handleRoomIconClick} />
    </CardMedia>
  );

  const subheader = (
    <SubHeader
      availability={doctor.availability}
      load={doctor.load}
      typeText={doctor.getTypeText()}
      acceptText={doctor.getAcceptText()}
      accepts={accepts}
    />
  );

  return (
    <Styled.Card id={doctor.id}>
      <CardHeader title={doctor.name} subheader={subheader} sx={{ bgcolor: bgColor, color }} />
      <CardContent>
        <Stack>
          <Typography variant="body2">{doctor.provider}</Typography>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleRoomIconClick}>
          <RoomIcon />
        </IconButton>
        <Typography variant="caption">{doctor.fullAddress}</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        />
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{cardMedia}</CardContent>
      </Collapse>
    </Styled.Card>
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  return prevProps.doctor.id === nextProps.doctor.id;
};
export default memo(DoctorCard, propsAreEqual);
