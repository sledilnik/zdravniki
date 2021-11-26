import { styled } from '@mui/material/styles';

const BaseGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: '1rem',
}));

export const Cards = styled(BaseGrid)(({ theme }) => ({
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
}));

export const Filter = styled(Cards)(({ theme }) => ({
  marginInline: '0.5rem',
  padding: '0.5rem 0',
}));

export const Doctors = styled(BaseGrid)(({ theme }) => ({
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}));
