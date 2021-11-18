import Container from '@mui/material/Container';
import ToggleAccepts from './ToggleAccepts';
import ToggleDoctorType from './ToggleDoctorType';

export default function Filters() {
  return (
    <Container
      maxWidth="false"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <ToggleDoctorType />
      <ToggleAccepts />
    </Container>
  );
}
