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

  '.MuiTypography-body1:first-of-type': {
    opacity: 0.25,
  },

  [theme.breakpoints.up('md')]: {
    marginBlock: '14px',
  },
}));

export const BackWrapper = styled(Stack)(() => ({
  cursor: 'pointer',
  '.MuiTypography-body1': {
    fontSize: '0.875rem',
    fontWeight: 600,
  },
}));

export const Changed = styled(Stack)(() => ({
  fontSize: '0.875rem',
  fontWeight: 700,
  letterSpacing: 0,
  color: 'inherit',
  whiteSpace: 'nowrap',
}));
