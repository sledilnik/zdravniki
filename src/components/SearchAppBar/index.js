import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { MenuIcon, SearchIcon } from 'components/Shared/Icons';
import { Search } from './styles';
import { filterContext } from 'context';
import { useState } from 'react';
import { useDebounce } from 'hooks';

export default function SearchAppBar() {
  const { setSearchValue } = filterContext.useFilter();
  const [value, setValue] = useState('');

  const handleSearchChange = event => {
    setValue(event.target.value);
  };

  useDebounce(() => setSearchValue(value), 500, [value]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Zdravniki
          </Typography>
          <Tooltip title="Išči po imenu ali naslovu med zdravniki na zemljevidu!">
            <Search.Search>
              <Search.SearchIconWrapper>
                <SearchIcon />
              </Search.SearchIconWrapper>
              <Search.StyledInputBase
                placeholder="Išči…"
                inputProps={{ 'aria-label': 'išči' }}
                value={value}
                onChange={handleSearchChange}
              />
            </Search.Search>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
