import { styled } from '@mui/material/styles';

import MuiAutocomplete from '@mui/material/Autocomplete';
import MuiPopper from '@mui/material/Popper';

export const Autocomplete = styled(MuiAutocomplete)(({ theme }) => ({
  width: '100px',
  '& .MuiOutlinedInput-root': {},

  '.MuiAutocomplete-inputRoot': {
    fontSize: '14px',
    padding: '2px 5px !important',
    color: theme.customColors.text,
    '&:hover': {
      color: theme.customColors.dark,
    },
    '&.Mui-focused fieldset': {
      borderColor: 'initial',
      borderWidth: '1px',
    },
  },
}));

export const Popper = styled(MuiPopper)(({ theme }) => ({
  '.MuiAutocomplete-popper': {},
  '.MuiAutocomplete-paper': {
    width: 'max-content',
    listStyle: 'none',
    margin: 0,
    padding: '0 10px',
    background: theme.palette.common.white,
    boxShadow: '0 1px 3px 0 rgba(0,0,0,.15)',
    border: '1px solid rgba(0,0,0,.39)',
    borderRadius: '6px',
  },

  '.MuiAutocomplete-listbox': {
    fontSize: '14px',
  },

  '.MuiAutocomplete-option': {
    color: theme.customColors.dark,
    '&:hover': {
      // backgroundColor: theme.customColors.brand,
    },
  },
}));
