import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { doctorsContext, filterContext, leafletContext } from 'context';
import SearchAppBar from './components/SearchAppBar/';
import { ChooseDoctorType, ChooseAccept } from 'components/Filters';
import Doctors from './components/Doctors/';
import { Grid } from 'components/Shared';

function App() {
  return (
    <>
      <SearchAppBar />
      <Container maxWidth="xl " component="main">
        <Grid.Filter>
          <ChooseDoctorType />
          <ChooseAccept />
        </Grid.Filter>
        <leafletContext.LeafletProvider>
          <Doctors />
        </leafletContext.LeafletProvider>
      </Container>
    </>
  );
}

function AppWrapper() {
  return (
    <>
      <CssBaseline />
      <doctorsContext.DoctorsProvider>
        <filterContext.FilterProvider>
          <App />
        </filterContext.FilterProvider>
      </doctorsContext.DoctorsProvider>
    </>
  );
}

export default AppWrapper;
