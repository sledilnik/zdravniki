import { styled } from '@mui/material/styles';
import MuiInputBase from '@mui/material/InputBase';
import MuiTextField from '@mui/material/TextField';
import MuiBox from '@mui/material/Box';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '24px',
  backgroundColor: 'transparent',
  width: '100%',

  '&:focus-within': {
    color: theme.customColors.dark,
    boxShadow: '0 0 7px 0 rgba(9,175,218,0.76)',
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const InputBase = styled(MuiInputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    fontWeight: 600,
    letterSpacing: 0,
    fontSize: '14px',
    height: '48px',
    padding: theme.spacing(0, 1, 0, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    borderRadius: '24px',
  },
}));

export const TextField = styled(MuiTextField)({
  '& .MuiOutlinedInput-root': {
    paddingBlock: '2px',
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: 0,
    borderRadius: '24px',
    '& fieldset': { border: 'none' },
    '&:hover fieldset': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    '&.Mui-focused fieldset': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
});

export const SearchBox = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '25px',
  border: `1px solid ${theme.customColors.borderLight}`,
  background: '#fff',
  gridArea: 'search',

  '& .MuiPaper-root': {
    width: '100%',
  },

  [theme.breakpoints.up('md')]: {
    width: '400px',
  },

  [theme.breakpoints.down('md')]: {
    width: 'auto',
    flexGrow: 1,
    margin: '0 12px 0 0',
    border: 'none',
    background: '#fff',
    height: '48px',

    '& input': {
      border: `1px solid ${theme.customColors.borderLight}`,
      maxWidth: '100%',
    },
  },
}));
