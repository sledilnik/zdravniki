import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

import { doctorsContext, filterContext, leafletContext } from 'context';
import SearchAppBar from './components/SearchAppBar/';
import { ChooseDoctorType, ChooseAccept } from 'components/Filters';
import Doctors from './components/Doctors/';
import { Grid, Loader } from 'components/Shared';
import { useDoctors } from 'context/doctorsContext';

function App() {
  const { isFetching, errors } = useDoctors();
  const hasError = errors.some(error => error instanceof Error);

  if (hasError) {
    return <div>Nekaj je narobe!</div>;
  }

  return (
    <>
      <SearchAppBar />
      {isFetching && !hasError ? (
        <Loader />
      ) : (
        <Container maxWidth="xl " component="main">
          <Grid.Filter>
            <ChooseDoctorType />
            <ChooseAccept />
          </Grid.Filter>

          <leafletContext.LeafletProvider>
            <Doctors />
          </leafletContext.LeafletProvider>
        </Container>
      )}
    </>
  );
}

const HiddenH1 = styled('h1')(({ theme }) => ({
  position: 'absolute',
  top: '-500vh',
}));

function AppWrapper() {
  return (
    <>
      <HiddenH1>Najdi prostega zdravnika</HiddenH1>
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
