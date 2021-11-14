import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

export const Card = styled(MuiCard)(({ theme }) => ({
  alignSelf: 'start',
  marginBottom: '1rem',
  marginRight: '1rem',
  width: '280px',
}));
