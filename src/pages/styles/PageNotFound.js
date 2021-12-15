import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const CustomContainer = styled('main')(() => ({
  margin: '24px auto 0 auto',
  maxWidth: '730px',
  '@media only screen and (min-width: 768px)': {
    margin: '48px auto 65px auto',
  },
}));

export const PageNotFound = styled('div')(() => ({
  maxWidth: 'calc(100% - 24px)',
  width: '376px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  margin: '0 auto 96px auto',
  padding: '0',
}));

export const Image = styled('img')(() => ({
  display: 'block',
  width: '100%',
  margin: '24px auto 0',
}));

export const BackToHomeBtn = styled(Link)(() => ({
  display: 'block',
  background: '#212529',
  fontWeight: 700,
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '100px',
  padding: '10px 40px',
  cursor: 'pointer',
}));
