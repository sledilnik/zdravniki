import { t } from 'i18next';
import { Link } from 'react-router-dom';
import * as SEO from 'components/SEO';
import * as Styled from './styles/PageNotFound';
import image from '../assets/caution-tape.png';

const PageNotFound = function PageNotFound() {
  const meta = [{ name: 'robots', content: 'noindex' }];

  return (
    <>
      <SEO.Dynamic title={t('pageNotFound.notFound')} meta={meta} />
      <Styled.CustomContainer id="main-content">
        <Styled.PageNotFound>
          <h1>{t('pageNotFound.notFound')}</h1>
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
