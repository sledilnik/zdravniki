import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { doctorsContext, filterContext, leafletContext, timestampsContext } from 'context';
import { Accessibility } from 'components/Shared';
import Header from 'components/Header';
import { useTranslation } from 'react-i18next';
import { THEME } from 'const';
import Router from 'routes';

const App = function App() {
  const theme = createTheme(THEME);
  const { t } = useTranslation();
  return (
    <>
      <CssBaseline />
      <Accessibility.A href="#main-content">{t('toContent')}</Accessibility.A>
      <Accessibility.H1>{t('findAvailableDoctor')}</Accessibility.H1>
      <timestampsContext.TimestampsProvider>
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
      </timestampsContext.TimestampsProvider>
    </>
  );
};

export default App;
