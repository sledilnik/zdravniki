import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { doctorsContext, filterContext, leafletContext } from 'context';
import SearchAppBar from './components/SearchAppBar/';
import { ChooseDoctorType, ChooseAccept } from 'components/Filters';
import Doctors from './components/Doctors/';
import { Grid, Loader } from 'components/Shared';
import { useDoctors } from 'context/doctorsContext';
import { Accessibility } from 'components/Shared';
import { DOCTORS } from './constants';
import { Toolbar } from '@mui/material';
import { MainScrollTop as ScrollTop } from 'components/Shared/ScrollTop';

function App() {
  const { isFetching, errors } = useDoctors();
  const hasError = errors.some(error => error instanceof Error);

  if (hasError) {
    return <div>Nekaj je narobe!</div>;
  }

  return (
    <>
      <Grid.App>
        <SearchAppBar />
        <Toolbar id="back-to-top-anchor" />
        {isFetching && !hasError ? (
          <Loader.Center />
        ) : (
          <Container id="main-content" maxWidth="xl " component="main">
            <Grid.Filter>
              <ChooseDoctorType />
              <ChooseAccept />
            </Grid.Filter>

            <leafletContext.LeafletProvider>
              <Doctors itemsPerPage={DOCTORS.PER_PAGE} />
            </leafletContext.LeafletProvider>
          </Container>
        )}
      </Grid.App>
      <ScrollTop />
    </>
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
