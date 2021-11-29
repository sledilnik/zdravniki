import { t } from 'i18next';
import * as Styled from './styles';

const lng = localStorage.getItem("i18nextLng") || "sl";

const NavLinks = ({ containerId = '', active }) => {
  return (
    <>
      <Styled.NavMenuLink
        to={`/${lng}/`}
        activeclassname="active"
      >
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
        {t('header.reportError')}
      </Styled.NavMenuItemLink>
      <Styled.NavMenuLink
        to={`/${lng}/about`}
        activeclassname="active"
      >
        {t('header.about')}
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
