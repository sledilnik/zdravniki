/* eslint-disable no-unused-vars */
import { lazy } from 'react';
import { useParams } from 'react-router';

import { cx } from 'class-variance-authority';

import * as SEO from 'components/SEO';
import { t } from 'i18next';

import RenderOnViewportEntry from 'components/RenderOnViewportEntry';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import './highcharts-options';

import styles from './Analytics.module.css';
import stylesLayout from './Layout.module.css';

import TouchdeviceNotification from './components/TouchDeviceNotification';
import { createChartDataProxy } from './data/create-chart-data-proxy';
import { SECTIONS } from './data/sections';

import { Card, CardHeader } from './components/ui/card';

const ChartCard = lazy(() => import('./Cards/ChartCard'));
const MapCard = lazy(() => import('./Cards/MapCard'));
const RichInfoClick = lazy(() => import('./Cards/RichInfoClick'));
const DataByYearAndAgeGroupCard = lazy(() => import('./Cards/DataByYearAndAgeGroupCard'));
const DashboardCard = lazy(() => import('./Cards/DashboardCard'));
const MotionCard = lazy(() => import('./Cards/MotionCard'));

const CARDS = {
  MotionCard,
  ChartCard,
  MapCard,
  RichInfoClick,
  DataByYearAndAgeGroupCard,
  DashboardCard,
};

const Analytics = function Analytics() {
  const { lng } = useParams();

  /**
   * TODO figure out fakeHeight for different cards on different viewports
   */

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.analytics')} lang={lng} />
      <TouchdeviceNotification />
      <main id="main-content" className={cx(styles.Analytics)}>
        <Sidebar />
        <div className={cx(stylesLayout.Layout, styles.PageContent)}>
          {SECTIONS.map(section => (
            <section
              key={section.sectionTitle}
              className={styles.ChartSection}
              aria-label={section.sectionTitle}
            >
              <h2 className={styles.SectionTitle}>
                {section.sectionTitle[0].toUpperCase() + section.sectionTitle.slice(1)}
              </h2>
              {section.charts.map(chart => {
                const Component = CARDS[chart.componentName];
                const chartProxy = createChartDataProxy(chart);

                return (
                  <div style={{ minHeight: chart.fakeHeight, position: 'relative' }}>
                    <RenderOnViewportEntry
                      id={`render-on-viewport-entry-${chartProxy.id}`}
                      key={chartProxy.id}
                      intersectionObserverInit={{ threshold: 0, rootMargin: '0px 0px 100px 0px' }}
                      srOnlyComponentsBeforeEntered={
                        <Card id={chartProxy.id}>
                          <CardHeader>
                            <div>
                              <h3>{chartProxy.options.title?.text}</h3>
                              <p>{chartProxy.options.subtitle?.text}</p>
                            </div>
                          </CardHeader>
                        </Card>
                      }
                    >
                      <Component id={chartProxy.id} options={chartProxy.options} />
                    </RenderOnViewportEntry>
                  </div>
                );
              })}
            </section>
          ))}
        </div>
      </main>
      <Footer lng={lng} />
    </>
  );
};

export default Analytics;
