import { useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import TemporaryDrawer from './Drawer';
import NavLinks from './NavLinks';
import SocialLinks from './SocialLinks';
import * as Icons from 'components/Shared/Icons';
import * as Styled from './styles';

const Header = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const eventHandler = event => {
    const { target } = event;
    const navLinks = ref.current?.children;

    const [active] = [...navLinks].filter(link => link.classList.contains('active'));
    if (target.id && active !== target) {
      active.classList.remove('active');
      target.classList.add('active');
    }

    if (!target.id) {
      target.blur();
    }
  };

  const handleHamburger = () => setOpen(true);

  return (
    <Box id="drawer" sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: theme => theme.customColors.brand,
          color: theme => theme.customColors.dark,
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <Icons.Icon name="Logo" style={{ height: '2rem' }} />
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
        </Toolbar>
        <TemporaryDrawer open={open} setOpen={setOpen} />
      </AppBar>
    </Box>
  );
};

export default Header;
