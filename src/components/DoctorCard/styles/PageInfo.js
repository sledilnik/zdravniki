import { styled } from '@mui/material/styles';

import Stack from '@mui/material/Stack';

export const DCWrapper = styled(Stack)(({ theme }) => {
  return {
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
  };
});

export const First = styled(Stack)(({ theme }) => {
  return {
    backgroundColor: '#F5F5F1',
    padding: '6px 8px',
    borderRadius: '5px 0 0 5px',
  };
});
export const Second = styled(Stack)(({ theme }) => {
  return {
    backgroundColor: '#EAEAE3',
    padding: '6px 8px',
    borderRadius: '0 5px 5px 0',
  };
});

export const LinkWrapper = styled(Stack)(({ theme }) => {
  return {
    '.MuiTypography-body1': {
      fontSize: '0.875rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },

    '.MuiTypography-body1:first-of-type': {
      opacity: 0.25,
    },
  };
});

export const BackWrapper = styled(Stack)(({ theme }) => {
  return {
    '.MuiTypography-body1': {
      fontSize: '0.875rem',
      fontWeight: 600,
    },
  };
});
