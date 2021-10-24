import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { doctorsContext, doctorsByTypeContext } from './context';
import SearchAppBar from './components/SearchAppBar';
import ChooseDoctorType from './components/ChooseDoctorType';
import Doctors from './components/Doctors';

function App() {
  return (
    <>
      <SearchAppBar />
      <Container maxWidth="xl " component="main">
        <ChooseDoctorType />
        <Doctors />
      </Container>
    </>
  );
}

function AppWrapper() {
  return (
    <>
      <CssBaseline />
      <doctorsContext.DoctorsProvider>
        <doctorsByTypeContext.DoctorsByTypeProvider>
          <App />
        </doctorsByTypeContext.DoctorsByTypeProvider>
      </doctorsContext.DoctorsProvider>
    </>
  );
}

export default AppWrapper;
