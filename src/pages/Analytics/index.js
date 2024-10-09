import { lazy } from 'react';
import { useParams } from 'react-router';

import * as SEO from 'components/SEO';
import { t } from 'i18next';

import './analytics.css';
import RenderOnViewportEntry from 'components/RenderOnViewportEntry';
import AnalyticsFooter from './AnalyticsFooter';

const LineChartExample = lazy(() => import('./LineChartExample'));
const ColumnChartExample = lazy(() => import('./ColumnChartExample'));

const Analytics = function Analytics() {
  const { lng } = useParams();

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.analytics')} lang={lng} />
      <main id="main-content" className="analytics-layout analytics-main">
        <h1 className="content ">{t('SEO.title.analytics')}</h1>
        <RenderOnViewportEntry>
          <ColumnChartExample />
        </RenderOnViewportEntry>
        <RenderOnViewportEntry intersectionObserverInit={{ threshold: 0.5, rootMargin: '0px' }}>
          <LineChartExample />
        </RenderOnViewportEntry>
      </main>
      <AnalyticsFooter lng={lng} />
    </>
  );
};

export default Analytics;
