/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { lazy, useLayoutEffect } from 'react';
import { useParams } from 'react-router';

import { cx } from 'class-variance-authority';
import { t } from 'i18next';
import './highcharts-options';

import * as SEO from 'components/SEO';

import Footer from './components/Footer';
import RenderOnViewportEntry from './components/RenderOnViewportEntry';
import Sidebar from './components/Sidebar';
import TouchdeviceNotification from './components/TouchDeviceNotification';
import { Card, CardHeader } from './components/ui/card';
import { SECTIONS, sectionTranslationKeys } from './data/sections';
import { createCardDataProxy } from './utils/create-card-data-proxy';

import styles from './styles/Analytics.module.css';
import stylesLayout from './styles/Layout.module.css';

const TaskD = lazy(() => import('./Cards/TaskD'));
const TaskA = lazy(() => import('./Cards/TaskA'));
const TaskSpecial = lazy(() => import('./Cards/TaskSpecial'));

const CARDS = {
  TaskD,
  TaskA,
  TaskSpecial,
};

const Analytics = function Analytics() {
  const { lng } = useParams();

  /**
   * TODO fix the fakeHeight hack
   * HACK to remove fakeHeight from article wrappers; this is a temporary solution util we figure out a better way to handle fake heights;
   * The charts are loaded in a lazy way and the fakeHeight is used to prevent layout shift when the chart is loaded;
   * The problem that I want to solve is that the fakeHeight is different for different viewports and the layout shift is still happening;
   * Also I want to have correct scrolling position before chart is loaded.
   * The fakeHeight is removed after the chart is loaded to prevent not consisant space between cards.
   *
   * I might try to wrap only the charts in the RenderOnViewportEntry component and not the whole card.
   */
  useLayoutEffect(() => {
    const articleWrappers = document.querySelectorAll('[data-card-id');
    articleWrappers.forEach(articleWrapper => {
      const article = articleWrapper.querySelector('article');
      if (article) {
        articleWrapper.style = undefined;
      }
    });
  }, []);

  const sections = SECTIONS.map(section => ({
    ...section,
    sectionTitle: t(sectionTranslationKeys[section.sectionTitle]),
  }));

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.analytics')} lang={lng} />
      <TouchdeviceNotification />
      <main id="main-content" className={cx(styles.Analytics)}>
        <Sidebar />
        <div className={cx(stylesLayout.Layout, styles.PageContent)}>
          {sections.map(section => (
            <section
              key={section.sectionTitle}
              className={styles.ChartSection}
              aria-label={section.sectionTitle}
            >
              <h2 className={styles.SectionTitle}>
                {section.sectionTitle[0].toUpperCase() + section.sectionTitle.slice(1)}
              </h2>
              {section.cards.map(card => {
                const Component = CARDS[card.componentName];
                const title = t(card.titleTranslationKey);

                const chartProxy = createCardDataProxy({ ...card, title });

                return (
                  <div
                    key={chartProxy.id}
                    data-card-id={chartProxy.id}
                    style={{ minHeight: card.fakeHeight }}
                  >
                    <RenderOnViewportEntry
                      id={`render-on-viewport-entry-${chartProxy.id}`}
                      intersectionObserverInit={{ threshold: 0, rootMargin: '0px 0px 100px 0px' }}
                      srOnlyComponentsBeforeEntered={
                        <Card id={chartProxy.id}>
                          <CardHeader>
                            <div>
                              <h3>{title}</h3>
                            </div>
                          </CardHeader>
                        </Card>
                      }
                    >
                      <Component id={chartProxy.id} options={chartProxy?.options} />
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
