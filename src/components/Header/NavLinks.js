import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFilter } from 'context/filterContext';
import { MAP } from 'const';
import * as Styled from './styles';

const NavLinks = function NavLinks() {
  const navigate = useNavigate();
  const { doctorType, setDoctorType, accept, setAccept, searchValue, setSearchValue } = useFilter();
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng, i18n]);

  const goHome = event => {
    event.preventDefault();
    if (doctorType !== 'gp') setDoctorType('gp');
    if (accept !== 'vsi') setAccept('vsi');
    if (searchValue) setSearchValue('');
    navigate(`/${lng}/gp/#a-vsi|l-${MAP.ZOOM}/${MAP.GEO_LOCATION.SL_CENTER.join('/')}|s-`);
  };

  return (
    <>
      <Styled.NavMenuLink to={`/${lng}/gp`} activeclassname="active" onClick={goHome}>
        {t('header.home')}
      </Styled.NavMenuLink>
      <Styled.NavMenuLink to={`/${lng}/faq`} activeclassname="active">
        {t('header.faq')}
      </Styled.NavMenuLink>
      <Styled.NavMenuLink to={`/${lng}/about`} activeclassname="active">
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
        href={`https://sledilnik.org/${lng}`}
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
