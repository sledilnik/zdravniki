import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { doctorsContext, filterContext, leafletContext } from 'context';
import SearchAppBar from 'components/SearchAppBar/';
import Filters from 'components/Filters';
import Doctors from 'components/Doctors/';

import { Loader } from 'components/Shared';
import { Accessibility } from 'components/Shared';
import { MainScrollTop as ScrollTop } from 'components/Shared/ScrollTop';

import { DOCTORS } from 'const';

function App() {
  const { isFetching, errors } = doctorsContext.useDoctors();
  const hasError = errors.some(error => error instanceof Error);

  if (hasError) {
    return <div>Nekaj je narobe!</div>;
  }

  return (
    <>
      <SearchAppBar />
      <Toolbar id="back-to-top-anchor" />
      {isFetching && !hasError ? (
        <Loader.Center />
      ) : (
        <Container id="main-content" maxWidth="xl" component="main">
          <Filters />
          <leafletContext.LeafletProvider>
            <Doctors itemsPerPage={DOCTORS.PER_PAGE} />
          </leafletContext.LeafletProvider>
        </Container>
      )}
      <ScrollTop />
    </>
  );
}

function AppWrapper() {
  const theme = createTheme();
  return (
    <>
      <CssBaseline />
      <Accessibility.A href="#main-content">Na vsebino</Accessibility.A>
      <Accessibility.H1>Najdi prostega zdravnika</Accessibility.H1>
      <doctorsContext.DoctorsProvider>
        <filterContext.FilterProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </filterContext.FilterProvider>
      </doctorsContext.DoctorsProvider>
    </>
  );
}

export default AppWrapper;
