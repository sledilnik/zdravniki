import * as Styled from './styles';

const NavLinks = ({ containerId = '', active }) => {
  return (
    <>
      <Styled.NavLink
        id={`${containerId}-0`}
        component="button"
        tabIndex={0}
        underline="none"
        className={active === 0 || !active ? 'active' : ''}
      >
        Imenik
      </Styled.NavLink>
      <Styled.NavLink
        id={`${containerId}-1`}
        component="button"
        tabIndex={0}
        underline="none"
        className={active === 1 ? 'active' : ''}
      >
        Prijavi napako
      </Styled.NavLink>
      <Styled.NavLink
        id={`${containerId}-2`}
        component="button"
        tabIndex={0}
        underline="none"
        className={active === 2 ? 'active' : ''}
      >
        O projektu
      </Styled.NavLink>
      <Styled.NavLink
        href="https://covid-19.sledilnik.org/sl/donate"
        target="_blank"
        rel="noopener"
        component="button"
        tabIndex={0}
        underline="none"
      >
        Podpri!
      </Styled.NavLink>
      <Styled.NavLink
        href="https://covid-19.sledilnik.org/stats"
        target="_blank"
        rel="noopener"
        component="button"
        tabIndex={0}
        underline="none"
      >
        Covid-19 sledilnik
      </Styled.NavLink>
    </>
  );
};

export default NavLinks;
