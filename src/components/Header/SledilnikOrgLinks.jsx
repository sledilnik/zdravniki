import i18next, { t } from 'i18next';

import * as Styled from './styles';

const SLEDILNIK_ORG_SUPPORTED_LNG = ['de', 'en', 'hr', 'it', 'sl'];

const SledilnikOrgLinks = function SledilnikOrgLinks() {
  const lng = i18next.language;
  const supportedLng = SLEDILNIK_ORG_SUPPORTED_LNG.includes(lng) ? lng : 'en';

  return (
    <>
      <Styled.NavMenuItemLink
        href={`https://covid-19.sledilnik.org/${supportedLng}/donate`}
        target="_blank"
        rel="noopener"
        component="button"
        tabIndex={0}
        underline="none"
        role="link"
      >
        {t('header.support')}
      </Styled.NavMenuItemLink>
      <Styled.NavMenuItemLink
        href={`https://sledilnik.org/${supportedLng}`}
        target="_blank"
        rel="noopener"
        component="button"
        tabIndex={0}
        underline="none"
        role="link"
      >
        {t('header.sledilnik')}
      </Styled.NavMenuItemLink>
    </>
  );
};

export default SledilnikOrgLinks;
