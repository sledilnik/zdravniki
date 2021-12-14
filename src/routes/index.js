import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from 'components/Shared';
import { HelmetProvider } from 'react-helmet-async';

const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));
const Faq = React.lazy(() => import('../pages/Faq'));
const Doctor = React.lazy(() => import('../pages/Doctor'));
const PageNotFound = React.lazy(() => import('../pages/PageNotFound'));

const Router = function Router() {
  const lng = localStorage.getItem('i18nextLng') || 'sl';

  return (
    <HelmetProvider>
      <Routes>
        <Route exact path="/" element={<Navigate to={`/${lng}/`} />} />
        <Route exact path="/faq" element={<Navigate to={`/${lng}/faq`} />} />
        <Route exact path="/about" element={<Navigate to={`/${lng}/about`} />} />
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
          path="/sl/faq"
          element={
            <Suspense fallback={<Loader.Center />}>
              <Faq />
            </Suspense>
          }
        />
        <Route
          exact
          path="/en/faq"
          element={
            <Suspense fallback={<Loader.Center />}>
              <Faq />
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
        <Route
          path="/en/404"
          element={
            <Suspense fallback={<Loader.Center />}>
              <PageNotFound />
            </Suspense>
          }
        />
        <Route
          path="/sl/404"
          element={
            <Suspense fallback={<Loader.Center />}>
              <PageNotFound />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader.Center />}>
              <Navigate to={`/${lng}/404`} />
            </Suspense>
          }
        />
      </Routes>
    </HelmetProvider>
  );
};

export default Router;
