import { styled } from '@mui/material/styles';
import BaseInfiniteScroll from 'react-infinite-scroll-component';

import { Grid } from 'components/Shared';

export const Wrapper = styled(Grid.Doctors)(({ theme }) => ({
  scrollBehavior: 'smooth',
}));

export const ButtonWrapper = styled('div')(({ theme }) => ({
  marginTop: '1rem',
  width: '100%',
  textAlign: 'center',
}));

export const WrapperInfinite = styled('div')(({ theme }) => ({
  height: 'calc(100vh - 64px - 80px)', // exact calculation will be done after we re-design header and filter re-design
  overflow: 'auto',
  display: 'flex',
}));
export const InfiniteScroll = styled(BaseInfiniteScroll)(({ theme }) => ({
  marginTop: '1rem',
  display: 'inline-flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
}));
