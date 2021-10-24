import { styled } from '@mui/material/styles';
export const Cards = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gridGap: '1rem',
}));
