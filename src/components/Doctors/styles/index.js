import { styled } from '@mui/material/styles';
import BaseInfiniteScroll from 'react-infinite-scroll-component';

import { Grid } from 'components/Shared';

import { SIZES } from 'const';

export const Wrapper = styled(Grid.Doctors)(({ theme }) => ({
  scrollBehavior: 'smooth',
  backgroundColor: theme.customColors.backgroundLight,
}));

export const ButtonWrapper = styled('div')(() => ({
  marginTop: '1rem',
  width: '100%',
  textAlign: 'center',
}));

export const WrapperInfinite = styled('div')(({ theme }) => ({
  width: '100%',
  height: `${SIZES.MAP_HEIGHT.default}`,
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 500,
  position: 'relative',
  boxShadow: '0 0 15px 0 rgba(0,0,0,0.18)',

  '> .infinite-scroll-component__outerdiv': {
    width: '100%',
  },

  [theme.breakpoints.up('md')]: {
    height: `${SIZES.MAP_HEIGHT.upMedium}`,
  },
}));
export const InfiniteScroll = styled(BaseInfiniteScroll)(({ theme }) => ({
  marginTop: '0',
  display: 'grid',
  width: '100%',

  '> *:last-child': {
    marginBottom: theme.spacing(2),
  },
}));
