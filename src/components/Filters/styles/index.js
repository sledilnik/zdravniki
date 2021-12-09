import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import MuiCardActions from '@mui/material/CardActions';
import MuiCollapse from '@mui/material/Collapse';

export * as Search from './Search';
export * as Icon from './Icon';

export const Card = styled(MuiCard)(({ theme }) => ({}));
export const CardActions = styled(MuiCardActions)(({ theme }) => ({}));
export const Collapse = styled(MuiCollapse)(({ theme }) => ({}));

// ? maybe insted of  Mui Box use Mui CardContent or even discard Grid and use only Collapse
export const Grid = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.common.white,
  boxShadow: '0 3px 10px 0 rgba(58,83,87,0.24)',
  padding: '12px 24px',
  position: 'relative',
  flexDirection: 'row',
  zIndex: 10,
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'column',
    padding: '12px',
  },
}));

export const Toggles = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'row',

  '> *': {
    margin: '0 12px 0 0',
  },

  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
    '> *': {
      margin: '0 12px 12px 0',
    },
  },
}));
