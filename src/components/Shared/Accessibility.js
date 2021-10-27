import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';

export const H1 = styled('h1')(({ theme }) => ({
  fontSize: '12px',
  position: 'fixed',
  top: '-120px',
  left: '16px',
}));

export const A = styled(Link)(({ theme }) => ({
  position: 'fixed',
  top: '-80px',
  left: '16px',
}));
