import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '24px',
  backgroundColor: 'transparent',
  opacity: 0.56,
  '&:hover': {
    color: theme.palette.common.white,
    backgroundColor: theme.customColors.accent,
    opacity: 1,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
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

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    lineHeight: 'normal',
    fontWeight: 600,
    letterSpacing: 0,
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '20ch',
    borderRadius: '24px',
    '&:focus': {
      color: theme.palette.common.white,
      backgroundColor: theme.customColors.accent,
      opacity: 1,
    },

    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
