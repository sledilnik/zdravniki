import * as SEO from 'components/SEO';
import { useParams } from 'react-router';
import { t } from 'i18next';

const Analytics = function Analytics() {
  const { lng } = useParams();
  return (
    <>
      <SEO.Dynamic title={t('SEO.title.analytics')} lang={lng} />
      <main>
        <h1>Analytics</h1>
      </main>
    </>
  );
};

export default Analytics;
