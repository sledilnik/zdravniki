import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { doctorsContext, filterContext } from 'context';
import { Accessibility } from 'components/Shared';
import Header from 'components/Header';
import { t } from 'i18next';
import { THEME } from 'const';
import Routes from 'routes';

function App() {
  const theme = createTheme(THEME);
  return (
    <>
      <CssBaseline />
      <Accessibility.A href="#main-content">{t('toContent')}</Accessibility.A>
      <Accessibility.H1>{t('findAvailableDoctor')}</Accessibility.H1>
      <doctorsContext.DoctorsProvider>
        <filterContext.FilterProvider>
          <ThemeProvider theme={theme}>
            <Header />
            <Routes />
          </ThemeProvider>
        </filterContext.FilterProvider>
      </doctorsContext.DoctorsProvider>
    </>
  );
}

export default App;
