import * as SEO from 'components/SEO';
import { useParams } from 'react-router';
import { t } from 'i18next';

import './analytics.css';
import AnalyticsFooter from './AnalyticsFooter';

import LineChartExample from './LineChartExample';
import ColumnChartExample from './ColumnChartExample';

const Analytics = function Analytics() {
  const { lng } = useParams();

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.analytics')} lang={lng} />
      <main id="main-content" className="analytics-layout analytics-main">
        <h1 className="content ">{t('SEO.title.analytics')}</h1>
        <ColumnChartExample />
        <LineChartExample />
      </main>
      <AnalyticsFooter lng={lng} />
    </>
  );
};

export default Analytics;
