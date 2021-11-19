import Container from '@mui/material/Container';
import ToggleAccepts from './ToggleAccepts';
import ToggleDoctorType from './ToggleDoctorType';
import Search from './Search';

export default function Filters() {
  return (
    <Container
      maxWidth="false"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        boxShadow: '0 3px 10px 0 rgba(0,0,0,0.06)',
      }}
    >
      <ToggleDoctorType />
      <ToggleAccepts />
      <Search />
    </Container>
  );
}
