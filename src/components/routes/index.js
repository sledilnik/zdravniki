import { Suspense } from 'react';

import { Navigate, Route, Routes as RRRoutes } from 'react-router';

import Home from 'pages/Home';
import About from 'pages/About';
import Doctor from 'pages/Doctor';
import { Loader } from 'components/Shared';

const Routes = () => {
  const lng = localStorage.getItem('i18nextLng') || 'sl';

  return (
    <RRRoutes>
      <Route exact path="/" element={<Navigate to={`/${lng}/`} />} />
      <Route
        exact
        path="/en/"
        element={
          <Suspense fallback={<Loader.Center />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        exact
        path="/sl/"
        element={
          <Suspense fallback={<Loader.Center />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        exact
        path="/en/about"
        element={
          <Suspense fallback={<Loader.Center />}>
            <About />
          </Suspense>
        }
      />
      <Route
        exact
        path="/sl/about"
        element={
          <Suspense fallback={<Loader.Center />}>
            <About />
          </Suspense>
        }
      />
      <Route
        exact
        path="/sl/o-projektu"
        element={
          <Suspense fallback={<Loader.Center />}>
            <About />
          </Suspense>
        }
      />
      <Route
        path="/sl/zdravnik/:priimekIme"
        element={
          <Suspense fallback={<Loader.Center />}>
            <Doctor />
          </Suspense>
        }
      />
      <Route
        path="/en/zdravnik/:priimekIme"
        element={
          <Suspense fallback={<Loader.Center />}>
            <Doctor />
          </Suspense>
        }
      />
      <Route
        path="/sl/zobozdravnik/:priimekIme"
        element={
          <Suspense fallback={<Loader.Center />}>
            <Doctor />
          </Suspense>
        }
      />
      <Route
        path="/en/zobozdravnik/:priimekIme"
        element={
          <Suspense fallback={<Loader.Center />}>
            <Doctor />
          </Suspense>
        }
      />
      <Route
        path="/sl/ginekolog/:priimekIme"
        element={
          <Suspense fallback={<Loader.Center />}>
            <Doctor />
          </Suspense>
        }
      />
      <Route
        path="/en/ginekolog/:priimekIme"
        element={
          <Suspense fallback={<Loader.Center />}>
            <Doctor />
          </Suspense>
        }
      />
    </RRRoutes>
  );
};

export default Routes;
