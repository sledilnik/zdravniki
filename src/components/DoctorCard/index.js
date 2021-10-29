import { memo, useState } from 'react';
import Card from '@mui/material/Card';
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

const DoctorCard = ({ doctor, handleRoomIconClick = () => {} }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      id={doctor.id}
      sx={{ alignSelf: 'start', marginBottom: '1rem', marginRight: '1rem', maxWidth: '300px' }}
    >
      <CardHeader
        title={doctor.name}
        subheader={<Chip.Accepts text={doctor.acceptText} accept={doctor.accept} />}
      />
      <CardContent>
        <Stack>
          <Typography>{doctor.activity}</Typography>
          <Typography variant="body2">{doctor.provider}</Typography>
        </Stack>
      </CardContent>
      <CardMedia component="div">
        <DoctorMap height="150px" doctor={doctor} />
      </CardMedia>
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
        <CardContent>
          <Stack>
            <Typography>{doctor.activity}</Typography>
            <Typography variant="body2">{doctor.provider}</Typography>
          </Stack>
          <Stack>
            <Typography variant="caption">{doctor.street}</Typography>
            <Typography variant="caption">
              {doctor.postalCode} {doctor.city}
            </Typography>
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  return prevProps.doctor.id === nextProps.doctor.id;
};
export default memo(DoctorCard, propsAreEqual);
