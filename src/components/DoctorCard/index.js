import { memo, useLayoutEffect, useState } from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { Chip, ExpandMore } from '../Shared';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { RoomIcon } from 'components/Shared/Icons';
import CardMedia from '@mui/material/CardMedia';
import DoctorMap from './Map';
import useMediaQuery from '@mui/material/useMediaQuery';
import json2mq from 'json2mq';
import { SIZES } from 'const';
import * as Styled from './styles';

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
      <DoctorMap height="150px" doctor={doctor} />
    </CardMedia>
  );

  const subheader = (
    <Stack sx={{ alignItems: 'start' }} spacing={1}>
      <Chip.Info text={doctor.getTypeText()} />
      <Chip.FilledAccepts text={doctor.getAcceptText()} accept={accepts} />
    </Stack>
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
