import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')`
  position: relative;
`;

export const LabelSrOnly = styled('label')`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

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
