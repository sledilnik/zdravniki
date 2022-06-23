import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Loader } from 'components/Shared';
import { HelmetProvider } from 'react-helmet-async';
import i18next from 'i18next';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Faq = lazy(() => import('../pages/Faq'));
const Doctor = lazy(() => import('../pages/Doctor'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

const RouteRedirect = function RouteRedirect() {
  const { lng } = useParams();
  const supportedLanguages = i18next.languages;
  const isLang = supportedLanguages.includes(lng);

  if (!lng || !isLang) return <Navigate to="/sl" />;

  return (
    <Suspense fallback={<Loader.Center />}>
      <Home />
    </Suspense>
  );
};

const Router = function Router() {
  const { lng } = useParams();
  i18next.changeLanguage(lng ?? process.env.REACT_APP_DEFAULT_LANGUAGE);

  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Navigate to={`/${lng}`} />} />
        <Route path="/faq" element={<Navigate to={`/${lng}/faq`} />} />
        <Route path="/about" element={<Navigate to={`/${lng}/about`} />} />
        <Route path="/:lng/" element={<RouteRedirect />} />
        <Route
          path="/:lng/about"
          element={
            <Suspense fallback={<Loader.Center />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/:lng/faq"
          element={
            <Suspense fallback={<Loader.Center />}>
              <Faq />
            </Suspense>
          }
        />
        <Route
          path="/:lng/:type/:name/:instId"
          element={
            <Suspense fallback={<Loader.Center />}>
              <Doctor />
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
