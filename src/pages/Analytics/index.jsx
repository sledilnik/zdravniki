import { lazy } from 'react';
import { useParams } from 'react-router';

import * as SEO from 'components/SEO';
import { t } from 'i18next';

import RenderOnViewportEntry from 'components/RenderOnViewportEntry';
import Footer from './Footer';
import Sidebar from './Sidebar';

import styles from './Layout.module.css';
import SloUEMapExample from './Charts/examples/SloUEMapExample';

const LineChartExample = lazy(() => import('./Charts/examples/LineChartExample'));
const ColumnChartExample = lazy(() => import('./Charts/examples/ColumnChartExample'));
const DrilldownChartExample = lazy(() => import('./Charts/examples/DrilldownChartExample'));

const Analytics = function Analytics() {
  const { lng } = useParams();

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.analytics')} lang={lng} />

      <main id="main-content" className={`${styles.AnalyticsLayout} ${styles.MinHeightNoHeader}`}>
        <h1 className="content" style={{ marginTop: '1em' }}>
          {t('SEO.title.analytics')}
        </h1>
        <Sidebar />
        <RenderOnViewportEntry>
          <SloUEMapExample id="slo-ue-map" />
        </RenderOnViewportEntry>

        <RenderOnViewportEntry>
          <ColumnChartExample id="column-chart" />
        </RenderOnViewportEntry>
        <RenderOnViewportEntry
          intersectionObserverInit={{
            threshold: 0.5,
            rootMargin: '0px',
          }}
          srOnlyComponentsBeforeEntered={
            <div id="line-chart">
              <h2>Line</h2>
              <h3>Subtitle</h3>
            </div>
          }
        >
          <LineChartExample id="line-chart" />
        </RenderOnViewportEntry>
        <RenderOnViewportEntry
          intersectionObserverInit={{
            threshold: 1,
            rootMargin: '0px',
          }}
          srOnlyComponentsBeforeEntered={
            <div id="drilldown-chart">
              <h2>Drilldown</h2>
              <h3>Click the slices to view versions.</h3>
            </div>
          }
        >
          <DrilldownChartExample id="drilldown-chart" />
        </RenderOnViewportEntry>
      </main>
      <Footer lng={lng} />
    </>
  );
};

export default Analytics;
