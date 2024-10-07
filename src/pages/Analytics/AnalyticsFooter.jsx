import PropTypes from 'prop-types';
import { t } from 'i18next';

import * as Icons from 'components/Shared/Icons';

const AnalyticsFooter = function AnalyticsFooter({ lng }) {
  return (
    <footer className="analytics-layout">
      <div className="full-content analytics-footer">
        <div className="analytics-footer-content">
          <Icons.Icon name="Logo" className="logo" />
        </div>
        <div className="analytics-footer-content">
          <h2>{t('SEO.title.home')}</h2>
          <nav aria-label="zdravniki">
            <a href={`/${lng}/`}>{t('header.home')}</a>
            <a href={`/${lng}/faq/`}>{t('header.faq')}</a>
            <a href={`/${lng}/about/`}>{t('header.about')}</a>
            <a href={`/${lng}/analytics`}>{t('header.analytics')}</a>
          </nav>
        </div>
        <div className="analytics-footer-content">
          <h2>{t('footer.ourProjects')}</h2>
          <nav aria-label="our projects">
            <a href={`https://covid-19.sledilnik.org/${lng}/`} target="_blank" rel="noreferrer">
              Covid-19 Sledilnik
            </a>
            <a href={`https://zdravniki.sledilnik.org/${lng}/`} target="_blank" rel="noreferrer">
              Zdravniki
            </a>
            <a href={`https://podnebnik.org/${lng}/`} target="_blank" rel="noreferrer">
              Podnebnik
            </a>
          </nav>
        </div>
        <div className="analytics-footer-content">
          <h2>{t('footer.links')}</h2>
          <nav aria-label="social links">
            <a href="https://www.facebook.com/Sledilnik" target="_blank" rel="noreferrer">
              <Icons.Icon
                name="Facebook"
                style={{ height: '1.2em', width: '1.2em', display: 'inline block' }}
              />{' '}
              Facebook
            </a>
            <a href="https://twitter.com/sledilnik" target="_blank" rel="noreferrer">
              <Icons.Icon
                name="Twitter"
                style={{ height: '1.2em', width: '1.2em', display: 'inline block' }}
              />{' '}
              X
            </a>
            <a href="https://github.com/sledilnik" target="_blank" rel="noreferrer">
              <Icons.Icon
                name="GitHub"
                style={{ height: '1.2em', width: '1.2em', display: 'inline block' }}
              />{' '}
              GitHub
            </a>
            <a
              href={`https://covid-19.sledilnik.org/${lng}/donate`}
              target="_blank"
              rel="noreferrer"
            >
              <Icons.Icon
                name="Euro"
                style={{ height: '1.2em', width: '1.2em', display: 'inline block' }}
              />{' '}
              Podpri!
            </a>
          </nav>
        </div>
      </div>
      <div className="full-content sledilnik-info">
        <div className="sledilnik-info-content">
          <div>
            © 2021-{new Date().getFullYear()} <strong>Sledilnik.org</strong>
          </div>
          <div>
            <a href="mailto:info@sledilnik.org">info@sledilnik.org</a>
            <a href="https://sledilnik.org" target="_blank" rel="noreferrer">
              sledilnik.org
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
AnalyticsFooter.propTypes = {
  lng: PropTypes.string.isRequired,
};

export default AnalyticsFooter;
