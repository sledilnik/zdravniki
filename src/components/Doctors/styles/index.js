import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')(({ theme }) => ({
  scrollBehavior: 'smooth',
}));

export const ButtonWrapper = styled('div')(({ theme }) => ({
  marginTop: '1rem',
  width: '100%',
  textAlign: 'center',
}));
