import { styled } from '@mui/material/styles';
import BaseInfiniteScroll from 'react-infinite-scroll-component';

import { Grid } from 'components/Shared';

import { SIZES } from 'const';

export const Wrapper = styled(Grid.Doctors)(({ theme }) => ({
  scrollBehavior: 'smooth',
  backgroundColor: theme.customColors.background,
}));

export const ButtonWrapper = styled('div')(() => ({
  marginTop: '1rem',
  width: '100%',
  textAlign: 'center',
}));

export const WrapperInfinite = styled('div')(({ theme }) => ({
  width: '100%',
  height: `calc(100vh - ${SIZES.MAP_HEIGHT.default} - 56px - 140.5px)`,
  overflow: 'auto',
  display: 'flex',
  '> .infinite-scroll-component__outerdiv': {
    width: '100%',
  },
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
  marginTop: '0',
  display: 'grid',
  gap: '1rem',
  width: '100%',

  '> *:last-child': {
    marginBottom: theme.spacing(2),
  },

  [theme.breakpoints.up('sm')]: {
    marginTop: '1rem',
  },
}));
