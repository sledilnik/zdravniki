import { styled } from '@mui/material/styles';
import MuiInputBase from '@mui/material/InputBase';
import MuiTextField from '@mui/material/TextField';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '24px',
  backgroundColor: 'transparent',
  opacity: 0.56,
  width: '100%',
  '&:hover': {
    backgroundColor: ' rgba(0, 0, 0, 0.04)',
  },
  '&:focus-within': {
    color: theme.palette.common.white,
    backgroundColor: theme.customColors.accent,
    opacity: 1,
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
  opacity: 0.56,
}));

export const InputBase = styled(MuiInputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    lineHeight: 'normal',
    fontWeight: 600,
    letterSpacing: 0,
    fontSize: '13px',
    height: '34px',
    padding: theme.spacing(0, 1, 0, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '20ch',
    borderRadius: '24px',

    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '20ch',
      },
    },
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
