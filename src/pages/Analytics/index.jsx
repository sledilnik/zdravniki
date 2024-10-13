import { lazy, useState } from 'react';
import { useParams } from 'react-router';

import * as SEO from 'components/SEO';
import { t } from 'i18next';

import './analytics.css';
import RenderOnViewportEntry from 'components/RenderOnViewportEntry';
import * as Icons from 'components/Shared/Icons';
import AnalyticsFooter from './AnalyticsFooter';
import Modal from './Modal';

const LineChartExample = lazy(() => import('./LineChartExample'));
const ColumnChartExample = lazy(() => import('./ColumnChartExample'));
const DrilldownChartExample = lazy(() => import('./Charts/DrilldownChartExample'));

const Analytics = function Analytics() {
  const { lng } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.analytics')} lang={lng} />

      <main id="main-content" className="analytics-layout analytics-main">
        <h1 className="content" style={{ marginTop: '1em' }}>
          {t('SEO.title.analytics')}
        </h1>
        <aside className="analytics-sidebar">
          <button type="button" onClick={openModal} aria-label="show links to charts">
            <Icons.Icon name="Chart" />
          </button>
          <Modal openModal={modalOpen} closeModal={closeModal} ariaLabelledBy="go-to-graph">
            <h2 id="go-to-graph">Pojdi na graf</h2>
            <div>
              <a href="#column-chart" onClick={closeModal} className="link">
                Column chart
              </a>
              <a href="#line-chart" onClick={closeModal} className="link">
                Line chart
              </a>
              <a href="#drilldown-chart" onClick={closeModal} className="link">
                Drilldown chart
              </a>
            </div>
          </Modal>
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
