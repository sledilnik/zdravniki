import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { doctorsContext, filterContext, leafletContext } from 'context';
import SearchAppBar from './components/SearchAppBar/';
import { ChooseDoctorType, ChooseAccept } from 'components/Filters';
import Doctors from './components/Doctors/';
import { Grid, Loader } from 'components/Shared';
import { useDoctors } from 'context/doctorsContext';
import { Accessibility } from 'components/Shared';

function App() {
  const { isFetching, errors } = useDoctors();
  const hasError = errors.some(error => error instanceof Error);

  if (hasError) {
    return <div>Nekaj je narobe!</div>;
  }

  return (
    <Grid.App>
      <SearchAppBar />
      {isFetching && !hasError ? (
        <Loader.Center />
      ) : (
        <Container id="main-content" maxWidth="xl " component="main">
          <Grid.Filter>
            <ChooseDoctorType />
            <ChooseAccept />
          </Grid.Filter>

          <leafletContext.LeafletProvider>
            <Doctors />
          </leafletContext.LeafletProvider>
        </Container>
      )}
      <div>
        <footer>THIS IS FOOTER</footer>
      </div>
    </Grid.App>
  );
}

function AppWrapper() {
  return (
    <>
      <CssBaseline />
      <Accessibility.A href="#main-content">Na vsebino</Accessibility.A>
      <Accessibility.H1>Najdi prostega zdravnika</Accessibility.H1>
      <doctorsContext.DoctorsProvider>
        <filterContext.FilterProvider>
          <App />
        </filterContext.FilterProvider>
      </doctorsContext.DoctorsProvider>
    </>
  );
}

export default AppWrapper;
