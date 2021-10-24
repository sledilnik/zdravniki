import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import { doctorsContext, doctorsByTypeContext } from './context';
import SearchAppBar from './components/SearchAppBar';
import ChooseDoctorType from './components/ChooseDoctorType';
import Loader from './components/Loader';

function App() {
  const { doctors } = doctorsByTypeContext.useDoctorsByType();
  const neki = doctors?.map(doctor => (
    <div key={doctor.id}>
      {doctor.type} {doctor.name} {doctor.accept}
    </div>
  ));
  return (
    <>
      <SearchAppBar />
      <Container maxWidth="sm" component="main">
        <ChooseDoctorType />
        {doctors ? neki : <Loader />}
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
