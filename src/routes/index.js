import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from 'components/Shared';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { DOCTORS } from 'const';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Faq = lazy(() => import('../pages/Faq'));
const Doctor = lazy(() => import('../pages/Doctor'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

const Router = function Router() {
  const {
    i18n: { languages, language },
  } = useTranslation();

  const faqRoutes = languages.map(lang => (
    <Route
      key={`${lang}-faq-route`}
      exact
      path={`/${lang}/faq`}
      element={
        <Suspense fallback={<Loader.Center />}>
          <Faq />
        </Suspense>
      }
    />
  ));

  const aboutRoutes = languages.map(lang => (
    <Route
      key={`${lang}-faq-route`}
      exact
      path={`/${lang}/about`}
      element={
        <Suspense fallback={<Loader.Center />}>
          <About />
        </Suspense>
      }
    />
  ));

  const notFoundRoutes = languages.map(lang => (
    <Route
      key={`${lang}-faq-route`}
      exact
      path={`/${lang}/404`}
      element={
        <Suspense fallback={<Loader.Center />}>
          <PageNotFound />
        </Suspense>
      }
    />
  ));

  const doctorPageRoutes = languages.map(lang => (
    <Route
      key={`${lang}-dr-page`}
      path={`/${lang}/:type/:name/:instId`}
      element={
        <Suspense fallback={<Loader.Center />}>
          <Doctor />
        </Suspense>
      }
    />
  ));

  const doctorTypeRoutes = languages.map(lang =>
    DOCTORS.TYPES.map(type => (
      <Route
        key={`${lang}-${type}-page`}
        exact
        path={`/${lang}/${type}`}
        element={
          <Suspense fallback={<Loader.Center />}>
            <Home />
          </Suspense>
        }
      />
    )).flat(),
  );

  return (
    <HelmetProvider>
      <Routes>
        <Route exact path="/" element={<Navigate to={`/${language}/gp`} />} />
        <Route exact path="/faq" element={<Navigate to={`/${language}/faq`} />} />
        <Route exact path="/about" element={<Navigate to={`/${language}/about`} />} />

        {faqRoutes}
        {aboutRoutes}
        {doctorTypeRoutes}
        {doctorPageRoutes}
        {notFoundRoutes}

        <Route
          path="*"
          element={
            <Suspense fallback={<Loader.Center />}>
              <Navigate to={`/${language}/404`} />
            </Suspense>
          }
        />
      </Routes>
    </HelmetProvider>
  );
};

export default Router;
