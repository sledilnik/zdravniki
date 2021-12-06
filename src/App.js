import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { doctorsContext, filterContext, leafletContext } from 'context';
import { Accessibility } from 'components/Shared';
import Header from 'components/Header';
import { t } from 'i18next';
import { THEME } from 'const';
import Router from 'routes';

const App = function App() {
  const theme = createTheme(THEME);
  return (
    <>
      <CssBaseline />
      <Accessibility.A href="#main-content">{t('toContent')}</Accessibility.A>
      <Accessibility.H1>{t('findAvailableDoctor')}</Accessibility.H1>
      <doctorsContext.DoctorsProvider>
        <leafletContext.LeafletProvider>
          <filterContext.FilterProvider>
            <ThemeProvider theme={theme}>
              <Header />
              <Router />
            </ThemeProvider>
          </filterContext.FilterProvider>
        </leafletContext.LeafletProvider>
      </doctorsContext.DoctorsProvider>
    </>
  );
};

export default App;
