import { styled } from '@mui/material/styles';

const BaseGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridGap: '1rem',
}));
export const Cards = styled(BaseGrid)(({ theme }) => ({
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
}));

export const Filter = styled(Cards)(({ theme }) => ({
  padding: '16px 0',
}));

export const Doctors = styled(BaseGrid)(({ theme }) => ({
  gridTemplateRows: 'min-content 1fr min-content',
  alignContent: 'stretch',
  alignItems: 'start',
  margin: '16px 0 0',
}));

export const Loader = styled('div')(({ theme }) => ({
  display: 'grid',
  gridAutoRows: '1fr',
  alignItems: 'center',
  minHeight: '50vh',
}));
