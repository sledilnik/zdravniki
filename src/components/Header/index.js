import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import * as Icons from 'components/Shared/Icons';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/system/Box';
export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: theme => theme.customColors.brand,
          color: theme => theme.customColors.dark,
        }}
      >
        <Toolbar>
          <Icons.Icon name="Logo" style={{ height: '2rem' }} />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, marginLeft: 'auto', display: { xs: 'inline-flex', sm: 'none' } }}
          >
            <Icons.MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
