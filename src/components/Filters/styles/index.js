import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import MuiCardActions from '@mui/material/CardActions';
import MuiCollapse from '@mui/material/Collapse';
import MuiStack from '@mui/material/Stack';
import MuiDivider from '@mui/material/Divider';

export * as Search from './Search';
export * as Icon from './Icon';

export const Card = styled(MuiCard)(({ theme }) => ({
  borderRadius: '24px',
  margin: '0 0 12px 0',
  boxShadow: 'none',
  '&.MuiCard-root': {
    backgroundColor: theme.customColors.background,
    width: '100%',

    '.MuiToggleButtonGroup-root': {
      backgroundColor: '#DAE5E7',
    },
  },
}));

export const CardActions = styled(MuiCardActions)(() => ({
  height: '48px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  fontSize: '14px',
  color: '#212529',
  borderTop: '0px solid transparent',
}));

export const FilterIconStack = styled(MuiStack)(() => ({
  alignItems: 'center',
  opacity: 1,
}));

export const FilterInfoStack = styled(MuiStack)(() => ({
  alignItems: 'center',
  opacity: 0.5,
  lineHeight: '20px',
  '> span': {
    marginLeft: '8px',
  },
}));

export const Divider = styled(MuiDivider)(() => ({
  borderWidth: 1,
  borderColor: '#C1D4D7',
}));

export const Collapse = styled(MuiCollapse)(() => ({
  padding: '0',
  '.MuiCollapse-wrapperInner': {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 12px 0 12px',
    borderBottom: '1px solid #DAE5E7',

    '> *': {
      margin: '0 12px 12px 0',
    },
  },

  '&.MuiCollapse-entered': {},

  '+ .MuiCardActions-root': {
    padding: '0 16px',
  },
  '&.MuiCollapse-entered + .MuiCardActions-root': {},
}));

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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'space-between',
    padding: '12px',
    background: '#fff',
    boxShadow: '0 0 10px 0 rgba(58,83,87,0.24)',
    '& .MuiToggleButtonGroup-root svg': {
      margin: 0,
    },
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
