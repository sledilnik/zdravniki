import MuiBox from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { SIZES } from 'const';

export const Main = styled(MuiBox)(() => ({
  // height: '100vh',
  // overflow: 'hidden',
  // maxWidth: '100vh',
}));

export const Box = styled(MuiBox)(({ theme }) => ({
  // overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
  '& .leaflet-container': {
    height: SIZES.MAP_HEIGHT.default,
  },
  [theme.breakpoints.up('sm')]: {
    '& .leaflet-container': {
      height: SIZES.MAP_HEIGHT.upSmall,
    },
  },
  [theme.breakpoints.up('md')]: {
    '& .leaflet-container': {
      height: SIZES.MAP_HEIGHT.upMedium,
    },
  },
}));
