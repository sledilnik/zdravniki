import MuiBox from '@mui/material/Box';
import { darken, lighten, styled } from '@mui/material/styles';

import { SIZES } from 'const';

export const Main = styled(MuiBox)(() => ({}));

export const Box = styled(MuiBox)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  '& .leaflet-container': {
    height: SIZES.MAP_HEIGHT.default,
  },
  '.marker-cluster-small div, .marker-cluster-medium div, .marker-cluster-large div': {
    backgroundColor: 'inherit',
    span: {
      backgroundColor: 'inherit',
      display: 'block',
      borderRadius: 100,
    },
  },

  '.marker-cluster-accepts-0': {
    backgroundColor: '#CC0C1E45',
    span: {
      color: lighten('#CC0C1E', 0.9),
      textShadow: '0 0 3px #00000080',
    },
  },
  '.marker-cluster-accepts-25': {
    backgroundColor: '#FF440045',
    span: {
      color: lighten('#FF4400', 0.9),
      textShadow: '0 0 3px #00000080',
    },
  },
  '.marker-cluster-accepts-50': {
    backgroundColor: '#FF6C0045',
    span: {
      color: darken('#FF6C00', 0.6),
    },
  },
  '.marker-cluster-accepts-75': {
    backgroundColor: '#F7AD1F45',
    span: {
      color: darken('#F7AD1F', 0.6),
    },
  },
  '.marker-cluster-accepts-100': {
    backgroundColor: '#78B90B45',
    span: {
      color: darken('#78B90B', 0.6),
    },
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
