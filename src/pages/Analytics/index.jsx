import { lazy } from 'react';
import { useParams } from 'react-router';

import * as SEO from 'components/SEO';
import { t } from 'i18next';

import './analytics.css';
import RenderOnViewportEntry from 'components/RenderOnViewportEntry';
import AnalyticsFooter from './AnalyticsFooter';
import DrilldownChartExample from './Charts/DrilldownChartExample';

const LineChartExample = lazy(() => import('./LineChartExample'));
const ColumnChartExample = lazy(() => import('./ColumnChartExample'));

const Analytics = function Analytics() {
  const { lng } = useParams();

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.analytics')} lang={lng} />
      <main id="main-content" className="analytics-layout analytics-main">
        <h1 className="content" style={{ marginTop: '1em' }}>
          {t('SEO.title.analytics')}
        </h1>
        <aside
          className="analytics-sidebar"
          style={{
            position: 'fixed',
            bottom: '128px',
            right: 'calc(var(--minimum-content-padding) / 2)',
            zIndex: 6,
            maxHeight: 'calc(100dvh - 256px)',
            background: '#f4f8f8',
            paddingBlock: '1em',
            paddingInline: '1.2em',
            border: '1px solid #ccc',
            borderRadius: '0.5em',
          }}
        >
          <h2>Pojdi na graf</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <a href="#column-chart">Column</a>
            <a href="#line-chart">Line</a>
            <a href="#drilldown-chart">Drilldown</a>
          </div>
        </aside>

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
      <AnalyticsFooter lng={lng} />
    </>
  );
};

export default Analytics;
