import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButtonBase from '@mui/material/IconButton';

export const NavLink = styled(MenuItem)(({ theme }) => ({
  color: theme.customColors.link,
  fontFamily: '"IBM Plex Sans", sans-serif !important',
  fontSize: '14px',
  fontWeight: '500',
  letterSpacing: 0,
  position: 'relative',
  padding: 0,
  lineHeight: '30px',
  transition: 'all 0.5s ease',
  outline: 'none',
  '&:focus, :hover': {
    backgroundColor: 'transparent',
    boxShadow: `inset 0px -10px 0 ${theme.customColors.background}`,
    color: theme.customColors.dark,
    opacity: 1,
  },
  '&.active': {
    backgroundColor: 'transparent',
    boxShadow: 'inset 0px -10px 0 rgba(255,255,255,1)',
    color: theme.customColors.dark,
    opacity: 1,
  },
}));

export const IconButton = styled(IconButtonBase)(({ theme }) => ({
  opacity: 0.56,
  '&:focus, :hover': {
    opacity: 1,
  },
}));
