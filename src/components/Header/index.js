import * as React from "react";
import { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import * as Icons from 'components/Shared/Icons';
import SearchModal from './SearchModal';
import './navbar.scss';

function CustomLink({ children, to, ...props }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      className={`router-link ${match ? "router-link-active" : ""}`}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [navbarClosing, setNavbarClosing] = useState(false);

  useEffect(() => {
    setNavbarClosing(true);
    const timer = setTimeout(() => {
      setNavbarClosing(false);
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`navbar-container ${navbarOpen ? "menuOpen" : ""} ${navbarClosing ? "closingMenu" : ""}`}>
      <CustomLink to="/" className="navbar-logo" />
      <div className="🍔" onClick={() => setNavbarOpen(!navbarOpen)}>
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
      </div>
      <div className="nav-overlay" />
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ ml: 1 }}
        onClick={() => setOpenSearch(!openSearch)}
      >
        <Icons.SearchIcon />
      </IconButton>
      <div className="nav-links">
        <CustomLink to="/"><span>Imenik</span></CustomLink>
        <CustomLink to="/report"><span>Prijavi napako</span></CustomLink>
        <CustomLink to="/faq"><span>FAQ</span></CustomLink>
        <CustomLink to="/about"><span>O projektu</span></CustomLink>
        <CustomLink to="https://covid-19.sledilnik.org/sl/donate" target="_blank" rel="noreferrer"><span>Podpri!</span></CustomLink>
        <CustomLink to="https://covid-19.sledilnik.org/stats" target="_blank" rel="noreferrer"><span>Covid-19 sledilnik</span></CustomLink>
        <div className="social">
          <a className="router-link" href="https://www.facebook.com/COVID19Sledilnik" target="_blank" rel="noreferrer">
            <img src="../../assets/icon-facebook.svg" alt="Facebook" />
          </a>
          <a className="router-link" href="https://twitter.com/sledilnik" target="_blank" rel="noreferrer">
            <img src="../../assets/icon-twitter.svg" alt="Twitter" />
          </a>
        </div>
      </div>
      <SearchModal open={openSearch} setOpen={setOpenSearch} />
    </div>
  );
};

export default Header;
