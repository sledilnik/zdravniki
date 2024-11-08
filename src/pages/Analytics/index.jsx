/* eslint-disable no-unused-vars */
import { lazy } from 'react';
import { useParams } from 'react-router';

import * as SEO from 'components/SEO';
import { t } from 'i18next';

import './HighchartsOptions';
import RenderOnViewportEntry from 'components/RenderOnViewportEntry';
import Footer from './Footer';
import Sidebar from './Sidebar';

import styles from './Layout.module.css';
import stylesCard from './Cards/Card.module.css';

import { SECTIONS } from './Data/sections';
import { createChartDataProxy } from './Data/create-chart-data-proxy';
import RichInfoClick from './RichInfoClick';
import TouchdeviceNotification from './TouchDeviceNotification';
import { CardHeader } from './Cards/CardHeader';

const ChartCard = lazy(() => import('./Cards/ChartCard'));
const MapCard = lazy(() => import('./Cards/MapCard'));

const CARDS = {
  ChartCard,
  MapCard,
};

const Analytics = function Analytics() {
  const { lng } = useParams();

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.analytics')} lang={lng} />
      <TouchdeviceNotification />
      <main id="main-content" className={`${styles.AnalyticsLayout} ${styles.MinHeightNoHeader}`}>
        <Sidebar />
        <h1 className={styles.MainTitle}>{t('SEO.title.analytics')}</h1>
        <section className={styles.ChartSection}>
          <h2 className={styles.SectionTitle}>Some section title</h2>
          <RichInfoClick />
        </section>

        {SECTIONS.map(section => (
          <section key={section.sectionTitle} className={styles.ChartsSection}>
            <h2 className={styles.SectionTitle}>
              {section.sectionTitle[0].toUpperCase() + section.sectionTitle.slice(1)}
            </h2>
            {section.charts.map(chart => {
              const CardComponent = CARDS[chart.componentName];
              const chartProxy = createChartDataProxy(chart);

              return (
                <RenderOnViewportEntry
                  key={chartProxy.id}
                  srOnlyComponentsBeforeEntered={
                    <div className={`${stylesCard.Card} `} style={{ minHeight: chart.fakeHeight }}>
                      <CardHeader>
                        <div>
                          <h3 id={chartProxy.id}>{chartProxy.options.title.text}</h3>
                          <p>{chartProxy.options.subtitle.text}</p>
                        </div>
                      </CardHeader>
                    </div>
                  }
                  className={styles.CardWrapper}
                  style={{ minHeight: chart.fakeHeight }}
                >
                  <CardComponent id={chartProxy.id} options={chartProxy.options} />
                </RenderOnViewportEntry>
              );
            })}
          </section>
        ))}
      </main>
      <Footer lng={lng} />
    </>
  );
};

export default Analytics;
