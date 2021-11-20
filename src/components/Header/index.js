import { useRef, memo } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import * as Icons from 'components/Shared/Icons';
import * as Styled from './styles';
import { useEventListener } from 'hooks';

const Header = () => {
  const navLinksRef = useRef();

  useEventListener(
    'click',
    event => {
      const { target, currentTarget } = event;
      const navLinks = currentTarget.children;
      const [active] = [...navLinks].filter(link => link.classList.contains('active'));
      if (active && active !== target) {
        active.classList.remove('active');
        target.classList.add('active');
      }
    },
    navLinksRef.current,
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: theme => theme.customColors.brand,
          color: theme => theme.customColors.dark,
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <Icons.Icon name="Logo" style={{ height: '2rem' }} />
          <Stack
            ref={navLinksRef}
            id="nav-links"
            direction="row"
            spacing={3}
            sx={{ marginLeft: 'auto', display: { sm: 'none', md: 'flex' } }}
          >
            <Styled.NavLink component="button" tabIndex={0} underline="none" className="active">
              Imenik
            </Styled.NavLink>
            <Styled.NavLink component="button" tabIndex={0} underline="none">
              Prijavi napako
            </Styled.NavLink>
            <Styled.NavLink component="button" tabIndex={0} underline="none">
              FAQ
            </Styled.NavLink>
            <Styled.NavLink component="button" tabIndex={0} underline="none">
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
          </Stack>
          <Stack
            id="nav-social"
            direction="row"
            spacing={0}
            sx={{ marginLeft: '16px', display: { sm: 'none', md: 'flex' } }}
          >
            <Styled.IconButton
              href="https://www.facebook.com/COVID19Sledilnik"
              target="_blank"
              rel="noopener"
            >
              <Icons.Icon
                name="Facebook"
                style={{
                  height: '0.75rem',
                  width: '0.75rem',
                  fill: theme => theme.customColors.link,
                }}
              />
            </Styled.IconButton>
            <Styled.IconButton href="https://twitter.com/sledilnik" target="_blank" rel="noopener">
              <Icons.Icon
                name="Twitter"
                style={{
                  height: '0.75rem',
                  width: '0.75rem',
                  fill: theme => theme.customColors.link,
                }}
              />
            </Styled.IconButton>
          </Stack>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, marginInline: 'auto 0', display: { sm: 'inline-flex', md: 'none' } }}
          >
            <Icons.MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default memo(Header);
