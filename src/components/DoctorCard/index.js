import { memo, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { Chip, ExpandMore } from '../Shared';

const DoctorCard = ({ doctor }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ maxWidth: 345, alignSelf: 'start' }}>
      <CardHeader
        title={doctor.name}
        subheader={<Chip.Accepts text={doctor.acceptText} accept={doctor.accept} />}
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          />
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{doctor.provider}</Typography>
          <Typography>{doctor.activity}</Typography>
          <Typography>{doctor.street}</Typography>
          <Typography>{doctor.city}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  return prevProps.doctor.id === nextProps.doctor.id;
};
export default memo(DoctorCard, propsAreEqual);
