import { t } from 'i18next';
import i18next from 'i18n';
import * as Styled from './styles';

const NavLinks = function NavLinks() {
  const lng = localStorage.getItem('i18nextLng') || 'sl';
  i18next.changeLanguage(lng);

  return (
    <>
      <Styled.NavMenuLink to={`/${lng}/`} activeclassname="active">
        {t('header.home')}
      </Styled.NavMenuLink>
      <Styled.NavMenuItemLink
        href="mailto:podpora-zdravniki@sledilnik.org"
        target="_blank"
        rel="noopener"
        component="button"
        tabIndex={0}
        underline="none"
      >
        {t('reportError.title')}
      </Styled.NavMenuItemLink>
      <Styled.NavMenuLink to={`/${lng}/about`} activeclassname="active">
        {t('header.about')}
      </Styled.NavMenuLink>
      <Styled.NavMenuLink to={`/${lng}/faq`} activeclassname="active">
        {t('header.faq')}
      </Styled.NavMenuLink>
      <Styled.NavMenuItemLink
        href={`https://covid-19.sledilnik.org/${lng}/donate`}
        target="_blank"
        rel="noopener"
        component="button"
        tabIndex={0}
        underline="none"
      >
        {t('header.support')}
      </Styled.NavMenuItemLink>
      <Styled.NavMenuItemLink
        href="https://sledilnik.org/"
        target="_blank"
        rel="noopener"
        component="button"
        tabIndex={0}
        underline="none"
      >
        {t('header.sledilnik')}
      </Styled.NavMenuItemLink>
    </>
  );
};

export default NavLinks;
