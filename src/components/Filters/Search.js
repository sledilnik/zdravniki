import Paper from '@mui/material/Paper';
import Box from '@mui/system/Box';
import { useLocation } from 'react-router-dom';

import * as Icons from 'components/Shared/Icons';
import { useFilter } from 'context/filterContext';
import { useState } from 'react';
import { useDebounce } from 'hooks';
import { t } from 'i18next';
import * as Styled from './styles';

const Search = function Search() {
  const { state } = useLocation();
  const { setSearchValue } = useFilter();

  const defaultValue = state?.searchValue ?? '';
  const [value, setValue] = useState(defaultValue);

  const handleSearchChange = event => {
    setValue(event.target.value);
  };

  useDebounce(() => setSearchValue(value), 500, [value]);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '24px',
        border: theme => `1px solid ${theme.palette.divider}`,
        background: theme => theme.customColors.background,
        gridArea: 'search',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          color: theme => theme.customColors.dark,
          background: 'transparent',
          borderRadius: '24px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          marginInline: '4px',
        }}
      >
        <Styled.Search.Search>
          <Styled.Search.SearchIconWrapper>
            <Icons.SearchIcon />
          </Styled.Search.SearchIconWrapper>
          <Styled.Search.InputBase
            placeholder={t('search')}
            value={value}
            onChange={handleSearchChange}
            aria-label="search"
          />
        </Styled.Search.Search>
      </Paper>
    </Box>
  );
};

export default Search;
