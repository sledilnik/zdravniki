import { styled } from '@mui/material/styles';
import BaseInfiniteScroll from 'react-infinite-scroll-component';

import { Grid } from 'components/Shared';

import { SIZES } from 'const';
import { Card } from '@mui/material';

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

export const InfoCard = styled(Card)(({ theme }) => ({
  justifySelf: 'center',
  width: '100%',
  padding: '10px 20px',
  background: 'transparent',
  boxShadow: 'none',
  position: 'relative',
  '&:hover': {
    '&:before': {
      width: '4px',
    },
  },
  '.MuiTypography-h2': {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: theme.customColors.doctor.colors.name,
    marginBottom: theme.spacing(0),
  },
  '.MuiTypography-h3': {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: theme.customColors.doctor.colors.provider,
  },
  'address.MuiTypography-body2': {
    color: theme.customColors.doctor.colors.address,
    fontSize: '0.75rem',
    lineHeight: '0.75rem',
    fontStyle: 'normal',
  },
}));
