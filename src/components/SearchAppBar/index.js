import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { MenuIcon, SearchIcon } from 'components/Shared/Icons';
import { Search } from './styles';
import { filterContext } from 'context';

export default function SearchAppBar() {
  const { searchValue, setSearchValue } = filterContext.useFilter();

  const handleSearchChange = event => {
    setSearchValue(event.target.value);
  };

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
          <Search.Search>
            <Search.SearchIconWrapper>
              <SearchIcon />
            </Search.SearchIconWrapper>
            <Search.StyledInputBase
              placeholder="Išči…"
              inputProps={{ 'aria-label': 'išči' }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Search.Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
