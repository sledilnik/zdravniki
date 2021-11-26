import { useRef, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Box, Autocomplete, TextField } from '@mui/material';
import TemporaryDrawer from './Drawer';
import NavLinks from './NavLinks';
import SocialLinks from './SocialLinks';
import * as Icons from 'components/Shared/Icons';
import * as Styled from './styles';
import i18next, { languages } from 'i18n';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const eventHandler = event => {
    const { target } = event;
    const navLinks = ref.current?.children;

    const [active] = [...navLinks].filter(link => link.classList.contains('active'));
    if (active && target?.id && active !== target) {
      active.classList.remove('active');
      target.classList.add('active');
    }

    if (!target.id) {
      target.blur();
    }
  };

  const handleHamburger = () => setOpen(true);

  const lng = localStorage.getItem("i18nextLng") || "sl";
  // eslint-disable-next-line
  const [language, setLanguage] = useState(lng);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeLocale = (event, newValue) => {
    const lang = newValue?.code;
    setLanguage(lang);
    i18next.changeLanguage(lang);
    navigate(`/${lang}/${location.pathname.substring(4)}`);
  };

  return (
    <Box id="drawer" sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme => theme.customColors.brand,
          color: theme => theme.customColors.dark,
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <NavLink to="/"><Icons.Icon name="Logo" style={{ height: '2rem' }} /></NavLink>
          <Styled.StackLarge ref={ref} id="nav-links" onClick={eventHandler}>
            <NavLinks containerId="nav-links" />
          </Styled.StackLarge>
          <Styled.StackSocialLarge>
            <SocialLinks />
          </Styled.StackSocialLarge>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              mr: 2,
              marginInline: 'auto 0',
              display: { xs: 'inline-flex', md: 'none' },
            }}
            onClick={handleHamburger}
          >
            <Icons.MenuIcon />
          </IconButton>
          <Autocomplete
            id="language-switcher"
            size="small"
            sx={{
              pl: 2,
              width: 100,
              display: { xs: 'none', md: 'flex' },
            }}
            options={languages}
            disableClearable
            defaultValue={languages[1]}
            getOptionLabel={(option) => typeof option?.code === 'undefined' ? '' : option.code.toUpperCase() }
            onChange={handleChangeLocale}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />)}
          />
        </Toolbar>
        <TemporaryDrawer open={open} setOpen={setOpen} />
      </AppBar>
    </Box>
  );
};

export default Header;
