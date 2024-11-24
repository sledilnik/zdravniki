/* eslint-disable no-unused-vars */
import { lazy } from 'react';
import { useParams } from 'react-router';

import * as SEO from 'components/SEO';
import { t } from 'i18next';

import './highcharts-options';
import RenderOnViewportEntry from 'components/RenderOnViewportEntry';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

import styles from './Layout.module.css';

import { SECTIONS } from './data/sections';
import { createChartDataProxy } from './data/create-chart-data-proxy';
import TouchdeviceNotification from './components/TouchDeviceNotification';

import { Card, CardHeader } from './components/ui/card';

const ChartCard = lazy(() => import('./Cards/ChartCard'));
const MapCard = lazy(() => import('./Cards/MapCard'));
const RichInfoClick = lazy(() => import('./Cards/RichInfoClick'));
const DataByYearAndAgeGroupCard = lazy(() => import('./Cards/DataByYearAndAgeGroupCard'));
const DashboardCard = lazy(() => import('./Cards/DashboardCard'));

const CARDS = {
  ChartCard,
  MapCard,
  RichInfoClick,
  DataByYearAndAgeGroupCard,
  DashboardCard,
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

        {SECTIONS.map(section => (
          <section key={section.sectionTitle} className={styles.ChartSection}>
            <h2 className={styles.SectionTitle}>
              {section.sectionTitle[0].toUpperCase() + section.sectionTitle.slice(1)}
            </h2>
            {section.charts.map(chart => {
              const Component = CARDS[chart.componentName];
              const chartProxy = createChartDataProxy(chart);

              return (
                <RenderOnViewportEntry
                  key={chartProxy.id}
                  srOnlyComponentsBeforeEntered={
                    <Card style={{ minHeight: chart.fakeHeight }}>
                      <CardHeader>
                        <div>
                          <h3 id={chartProxy.id}>{chartProxy.options.title?.text}</h3>
                          <p>{chartProxy.options.subtitle?.text}</p>
                        </div>
                      </CardHeader>
                    </Card>
                  }
                  style={{ minHeight: chart.fakeHeight }}
                >
                  <Component id={chartProxy.id} options={chartProxy.options} />
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
