import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from 'components/Shared';
import { HelmetProvider } from 'react-helmet-async';
import i18next from 'i18next';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Faq = lazy(() => import('../pages/Faq'));
const Doctor = lazy(() => import('../pages/Doctor'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

const Router = function Router() {
  const lng = window.location.pathname.substring(1, 3);

  useEffect(() => {
    const supportedLanguages = i18next.languages;
    if (lng === '' || !supportedLanguages.includes(lng)) {
      window.location.pathname = `/${process.env.REACT_APP_DEFAULT_LANGUAGE}/`;
      i18next.changeLanguage(process.env.REACT_APP_DEFAULT_LANGUAGE);
      return;
    }
    if (i18next.language !== lng) {
      i18next.changeLanguage(lng);
    }
  }, [lng]);

  // TODO: unify routes names, some are in English (e.g. '/about'), others in Slovenian (/zdravnik, /zobozdravnik, /ginekolog)
  return (
    <HelmetProvider>
      <Routes>
        <Route exact path="/" element={<Navigate to={`/${lng}/`} />} />
        <Route exact path="/faq" element={<Navigate to={`/${lng}/faq`} />} />
        <Route exact path="/about" element={<Navigate to={`/${lng}/about`} />} />
        <Route
          exact
          path="/:lng"
          element={
            <Suspense fallback={<Loader.Center />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          exact
          path="/:lng/about"
          element={
            <Suspense fallback={<Loader.Center />}>
              <About />
            </Suspense>
          }
        />
        <Route
          exact
          path="/:lng/faq"
          element={
            <Suspense fallback={<Loader.Center />}>
              <Faq />
            </Suspense>
          }
        />
        <Route
          path="/:lng/zdravnik/:priimekIme"
          element={
            <Suspense fallback={<Loader.Center />}>
              <Doctor />
            </Suspense>
          }
        />
        <Route
          path="/:lng/zobozdravnik/:priimekIme"
          element={
            <Suspense fallback={<Loader.Center />}>
              <Doctor />
            </Suspense>
          }
        />
        <Route
          path="/:lng/ginekolog/:priimekIme"
          element={
            <Suspense fallback={<Loader.Center />}>
              <Doctor />
            </Suspense>
          }
        />
        <Route
          path="/:lng/zdravnik/:priimekIme/edit"
          element={
            <Suspense fallback={<Loader.Center />}>
              <Doctor isReportError />
            </Suspense>
          }
        />
        <Route
          path="/:lng/zobozdravnik/:priimekIme/edit"
          element={
            <Suspense fallback={<Loader.Center />}>
              <Doctor isReportError />
            </Suspense>
          }
        />
        <Route
          path="/:lng/ginekolog/:priimekIme/edit"
          element={
            <Suspense fallback={<Loader.Center />}>
              <Doctor isReportError />
            </Suspense>
          }
        />
        <Route
          path="/:lng/404"
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
