import { styled } from '@mui/material/styles';

import MuiContainer from '@mui/material/Container';

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
