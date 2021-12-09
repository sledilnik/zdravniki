import { t } from 'i18next';
import { Link } from 'react-router-dom';
import * as SEO from 'components/SEO';
import * as Styled from './styles/PageNotFound';
import image from '../assets/caution-tape.png';

const PageNotFound = function PageNotFound() {
  const lng = localStorage.getItem('i18nextLng') || 'sl';
  const meta = [{ name: 'robots', content: 'noindex' }];

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.notFound')} meta={meta} lang={lng} />
      <Styled.CustomContainer id="main-content">
        <Styled.PageNotFound>
          <h1>{t('SEO.title.notFound')}</h1>
          <p>{t('pageNotFound.somethingWentWrong')}</p>
          <Styled.Image src={image} alt={t('pageNotFound.imageDescription')} />
          <div>
            <Link to="/" style={{ cursor: 'pointer' }}>
              {t('header.home')}
            </Link>
          </div>
        </Styled.PageNotFound>
      </Styled.CustomContainer>
    </>
  );
};

export default PageNotFound;
