import { styled } from '@mui/material/styles';

import MuiContainer from '@mui/material/Container';
import MuiBox from '@mui/material/Box';

export * as Search from './Search';
export * as Icon from './Icon';

export const Container = styled(MuiContainer)(({ theme }) => ({
  // ? better to switch with Box
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  boxShadow: '0 3px 10px 0 rgba(0,0,0,0.06)',
  paddingLeft: theme.spacing(0.5),
  paddingRight: theme.spacing(0.5),
}));

export const Grid = styled(MuiBox)(({ theme }) => {
  return {
    margin: '4px 8px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    gap: '0.5em 0px',
    gridAutoFlow: 'row',
    gridTemplateAreas: `
      "doctor-type doctor-type"
      "accepts age-group"
      "search search"`,
    [theme.breakpoints.up('sm')]: {
      margin: '8px 16px',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      gap: '0.5em 0.5em',
      gridAutoFlow: 'row',
      gridTemplateAreas: `
        "doctor-type age-group"
        "accepts search"`,
    },
    [theme.breakpoints.up('lg')]: {
      margin: '12px 24px',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridTemplateRows: '1fr',
      gap: '0.5em 0.5em',
      gridAutoFlow: 'row',
      gridTemplateAreas: `
        "doctor-type age-group accepts search"`,
    },
  };
});
