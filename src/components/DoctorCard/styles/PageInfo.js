import { styled } from '@mui/material/styles';

import Stack from '@mui/material/Stack';

export const DCWrapper = styled(Stack)(({ theme }) => ({
  color: theme.customColors.doctor.colors.chip,
  fontSize: '0.8125rem',
  fontWeight: 400,
  letterSpacing: 0,
  borderRadius: '5px',
  marginBlock: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
  '.icon': {
    opacity: 0.25,
  },
  '.text': {
    opacity: 0.56,
  },
}));

export const First = styled(Stack)(({ theme, single }) => ({
  backgroundColor: theme.customColors.doctor.colors.chipBcg1,
  padding: '6px 8px',
  borderRadius: single ? '5px' : '5px 0 0 5px',
}));

export const Second = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.customColors.doctor.colors.chipBcg2,
  padding: '6px 8px',
  borderRadius: '0 5px 5px 0',
}));

export const LinkWrapper = styled(Stack)(({ theme }) => ({
  marginBlock: '8px',
  '.MuiTypography-body1': {
    fontSize: '0.875rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  [theme.breakpoints.up('md')]: {
    marginBlock: '10px',
  },
}));

export const ToolbarWrapper = styled(Stack)(({ theme }) => ({
  margin: '60px 0 2px 0',

  [theme.breakpoints.down('md')]: {
    marginTop: '4px',
  },
}));

export const LinksMenuWrapper = styled(Stack)(({ theme }) => ({
  borderTop: `1px solid ${theme.customColors.background}`,
  borderBottom: `1px solid ${theme.customColors.background}`,
  margin: '14px 0',
  padding: '10px 0',
  fontSize: '15px',
  color: theme.customColors.dark,
  textTransform: 'lowercase',
  svg: {
    width: '24px',
    height: 'auto',
    verticalAlign: 'middle',
  },
  button: {
    color: theme.customColors.dark,
    fontSize: '15px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    '&:hover': {
      color: theme.customColors.links,
    },
  },
  a: {
    color: theme.customColors.dark,
    fontWeight: 'normal',
    fontSize: '15px',
    '&:hover': {
      color: theme.customColors.links,
    },
  },
}));

export const BackWrapper = styled(Stack)(({ theme }) => ({
  cursor: 'pointer',
  '.MuiButtonBase-root': {
    padding: '5px 8px',
  },
  '.MuiTypography-body1': {
    fontSize: '0.875rem',
    fontWeight: 600,
  },
  '&:hover': {
    color: theme.customColors.links,
  },
}));

export const Override = styled(Stack)(({ theme }) => ({
  cursor: 'help',
  minWidth: '74.5px',
  fontSize: '12px',
  color: theme.customColors.textLight,
  whiteSpace: 'nowrap',
  border: `1px solid ${theme.customColors.borderLight}`,
  borderRadius: '5px',
  padding: '5px 8px',
  svg: {
    margin: '0 5px 0 0',
    opacity: '0.25',
  },
}));
