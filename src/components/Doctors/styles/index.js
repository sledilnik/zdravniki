import { styled } from '@mui/material/styles';
import BaseInfiniteScroll from 'react-infinite-scroll-component';

import { Grid } from 'components/Shared';

import { SIZES } from 'const';

export const Wrapper = styled(Grid.Doctors)(({ theme }) => ({
  scrollBehavior: 'smooth',
  backgroundColor: theme.customColors.background,
}));

export const ButtonWrapper = styled('div')(({ theme }) => ({
  marginTop: '1rem',
  width: '100%',
  textAlign: 'center',
}));

export const WrapperInfinite = styled('div')(({ theme }) => ({
  height: `calc(100vh - ${SIZES.MAP_HEIGHT.default} - 56px - 140.5px)`,
  overflow: 'auto',
  display: 'flex',
  [theme.breakpoints.up('sm')]: {
    height: `calc(100vh - ${SIZES.MAP_HEIGHT.upSmall} - 56px - 140.5px)`,
  },
  [theme.breakpoints.up('md')]: {
    height: 'calc(100vh - 64px - 91px)',
  },
  [theme.breakpoints.up('lg')]: {
    height: 'calc(100vh - 64px - 54px)',
  },
}));
export const InfiniteScroll = styled(BaseInfiniteScroll)(({ theme }) => ({
  marginTop: '1rem',
  display: 'inline-flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
}));
