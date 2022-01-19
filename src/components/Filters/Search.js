import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import * as Icons from 'components/Shared/Icons';
import { useFilter } from 'context/filterContext';
import { useDebounce, useDoctorTypeExactPath } from 'hooks';
import * as Styled from './styles';

const Search = function Search() {
  const { setSearchValue } = useFilter();
  const { t } = useTranslation();

  const { search } = useDoctorTypeExactPath();

  const [value, setValue] = useState(search ?? '');

  const inputRef = useRef(null);

  const clearValue = () => {
    setValue('');
    inputRef.current.focus();
  };

  const handleSearchChange = event => {
    setValue(event.target.value);
  };

  useDebounce(() => setSearchValue(value), 500, [value]);

  return (
    <Styled.Search.SearchPaper elevation={0}>
      <Styled.Search.Search>
        <Styled.Search.SearchIconWrapper>
          <Icons.Icon name="Search" />
        </Styled.Search.SearchIconWrapper>
        <Styled.Search.InputBase
          placeholder={t('search')}
          value={value}
          inputRef={inputRef}
          onChange={handleSearchChange}
          aria-label="search"
          type="search"
        />
        {!!value && (
          <Styled.Search.ClearInput onClick={clearValue}>
            <Icons.Icon name="Close" style={{ height: '12px' }} />
          </Styled.Search.ClearInput>
        )}
      </Styled.Search.Search>
    </Styled.Search.SearchPaper>
  );
};

export default Search;
