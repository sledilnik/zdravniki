import { styled } from '@mui/material/styles';

export const Cards = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gridGap: '1rem',
}));

export const Doctors = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '0.1fr 0.8fr 0.1fr',
  gridGap: '1rem',
  alignContent: 'stretch',
  alignItems: 'start',
}));

export const Loader = styled('div')(({ theme }) => ({
  display: 'grid',
  gridAutoRows: '1fr',
  alignItems: 'center',
  minHeight: '50vh',
}));
