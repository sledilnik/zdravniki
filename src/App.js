import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { doctorsContext, filterContext } from 'context';
import { Accessibility } from 'components/Shared';
import Header from 'components/Header';
import Home from 'pages/Home';
import About from 'pages/About';

function App() {

  const lng = localStorage.getItem("i18nextLng") || "sl";

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Navigate to={`/${lng}/`} />} />
        <Route exact path="/en/" element={<Suspense fallback={<>t{'loading'}</>}><Home /></Suspense>} />
        <Route exact path="/sl/" element={<Suspense fallback={<>t{'loading'}</>}><Home /></Suspense>} />
        <Route exact path="/en/about" element={<Suspense fallback={<>t{'loading'}</>}><About /></Suspense>} />
        <Route exact path="/sl/about" element={<Suspense fallback={<>t{'loading'}</>}><About /></Suspense>} />
      </Routes>
    </div>
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
