import { styled } from '@mui/material/styles';

export const Textarea = styled('textarea')(({ theme }) => ({
  fontFamily: '"IBM Plex Sans", sans-serif',
  fontSize: '0.8rem',
  fontWeight: 700,
  backgroundColor: 'transparent',
  padding: '4px 8px',
  border: '1px solid #161822',
  resize: 'none',
  overflow: 'hidden',
  width: '100%',
  borderRadius: '3px',
  '&:hover': {
    backgroundColor: '#d3d3d3',
    cursor: 'pointer',
  },
  [theme.breakpoints.up('lg')]: {
    minWidth: '400px',
  },
}));

export const Select = styled('select')(({ theme }) => ({
  fontFamily: '"IBM Plex Sans", sans-serif',
  fontSize: '0.8rem',
  fontWeight: 700,
  marginBottom: theme.spacing(0.5),
  letterSpacing: 0,
  backgroundColor: 'transparent',
  padding: '2px 4px',
  border: '1px solid #161822',
  borderRadius: '3px',
  '&:hover': {
    backgroundColor: '#d3d3d3',
    cursor: 'pointer',
  },
}));
