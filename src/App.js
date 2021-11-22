import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Faq from './pages/Faq';
import Home from './pages/Home';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { doctorsContext, filterContext } from 'context';
import Header from 'components/Header';
import { Accessibility } from 'components/Shared';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<Faq />} />
      </Routes>
    </div >
  );
}

function AppWrapper() {
  const theme = createTheme({
    typography: {
      fontFamily: ['IBM Plex Sans', 'Roboto', 'sans-serif'].join(','),
    },
    customColors: {
      accent: '#09AFDA',
      brand: '#95C83F',
      danger: '#DC3435',
      dark: '#212529',
      lightGrey: '#CDCDCD',
      background: '#F0F0E8',
      text: 'rgba(0,0,0,.56)',
      link: 'rgba(33,37,41,0.56);',
    },
    customOpacity: {
      half: 0.56,
    },
  });
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
