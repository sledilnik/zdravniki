import { styled } from '@mui/material/styles';
import BaseInfiniteScroll from 'react-infinite-scroll-component';

import { SIZES } from 'const';

export const Wrapper = styled('div')(({ theme, show }) => {
  const isMap = show === 'map';
  const isCards = show === 'cards';

  // ? zIndex must change on show change otherwise map events are not working (zoom, drag)

  return {
    position: 'relative',
    scrollBehavior: 'smooth',
    backgroundColor: theme.customColors.backgroundLight,
    zIndex: 1,

    '.map, .cards': {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      transition: '0.2s all ease-in',
    },

    '.map': {
      opacity: isMap ? 1 : 0,
      transform: isMap ? 'scale(1)' : 'scale(0.9)',
      zIndex: isMap ? 2 : 1,
    },

    '.cards': {
      opacity: isCards ? 1 : 0,
      zIndex: isCards ? 2 : 1,
      transform: isCards ? 'translateX(0)' : 'translateX(100%)',
    },

    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gap: '0',
      gridTemplateColumns: '1fr 450px',

      '.map, .cards': { position: 'relative', opacity: 1, zIndex: 1 },
      '.map': { transform: 'scale(1)' },
    },
  };
});

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

  [theme.breakpoints.up('sm')]: {
    height: `${SIZES.MAP_HEIGHT.upSmall}`,
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
