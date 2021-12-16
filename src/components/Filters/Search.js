import Paper from '@mui/material/Paper';
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
    <Styled.Search.SearchBox>
      <Paper
        elevation={0}
        sx={{
          color: theme => theme.customColors.dark,
          background: 'transparent',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Styled.Search.Search>
          <Styled.Search.SearchIconWrapper>
            <Icons.Icon name="Search" />
          </Styled.Search.SearchIconWrapper>
          <Styled.Search.InputBase
            placeholder={t('search')}
            value={value}
            onChange={handleSearchChange}
            aria-label="search"
            type="search"
          />
        </Styled.Search.Search>
      </Paper>
    </Styled.Search.SearchBox>
  );
};

export default Search;
