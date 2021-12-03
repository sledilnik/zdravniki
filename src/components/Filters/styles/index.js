import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

export * as Search from './Search';
export * as Icon from './Icon';

export const Grid = styled(MuiBox)(({ theme }) => ({
  padding: '4px 8px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr 1fr',
  gap: '0.5em 0px',
  gridAutoFlow: 'row',
  gridTemplateAreas: `
      "doctor-type doctor-type"
      "accepts age-group"
      "search search"`,
  backgroundColor: theme.palette.common.white,
  [theme.breakpoints.up('sm')]: {
    padding: '8px 16px',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: '0.5em 0.5em',
    gridAutoFlow: 'row',
    gridTemplateAreas: `
        "doctor-type age-group"
        "accepts search"`,
  },
  [theme.breakpoints.up('lg')]: {
    padding: '12px 24px',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr',
    gap: '0.5em 0.5em',
    gridAutoFlow: 'row',
    gridTemplateAreas: `
        "doctor-type age-group accepts search"`,
  },
}));
