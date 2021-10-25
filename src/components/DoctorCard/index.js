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

const DoctorCard = ({ doctor, handleRoomIconClick = () => {} }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card id={doctor.id} sx={{ maxWidth: 345, alignSelf: 'start' }}>
      <CardHeader
        title={doctor.name}
        subheader={<Chip.Accepts text={doctor.acceptText} accept={doctor.accept} />}
      />
      <CardActions disableSpacing>
        <IconButton onClick={handleRoomIconClick}>
          <RoomIcon />
        </IconButton>
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
            <Typography>{doctor.provider}</Typography>
            <Typography>{doctor.activity}</Typography>
            <Stack direction="row" spacing={1}>
              <Typography>{doctor.street}</Typography>,<Typography>{doctor.city}</Typography>
            </Stack>
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
