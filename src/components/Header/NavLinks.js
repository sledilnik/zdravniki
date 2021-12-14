import { useEffect } from 'react';
import { t, changeLanguage } from 'i18next';
import { useNavigate } from 'react-router';
import { useFilter } from 'context/filterContext';
import * as Styled from './styles';

const NavLinks = function NavLinks() {
  const navigate = useNavigate();
  const { doctorType, setDoctorType, accept, setAccept, searchValue, setSearchValue } = useFilter();
  const lng = localStorage.getItem('i18nextLng') || 'sl';
  useEffect(() => {
    changeLanguage(lng);
  }, [lng]);

  const goHome = event => {
    event.preventDefault();
    if (doctorType !== 'gp') setDoctorType('gp');
    if (accept !== 'vsi') setAccept('vsi');
    if (searchValue) setSearchValue('');
    navigate(`/${lng}/`);
  };

  return (
    <>
      <Styled.NavMenuLink to={`/${lng}/`} activeclassname="active" onClick={goHome}>
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
