import { styled } from '@mui/material/styles';
import BaseInfiniteScroll from 'react-infinite-scroll-component';

export const Wrapper = styled('div')(({ theme }) => ({
  scrollBehavior: 'smooth',
}));

export const ButtonWrapper = styled('div')(({ theme }) => ({
  marginTop: '1rem',
  width: '100%',
  textAlign: 'center',
}));

export const InfiniteScroll = styled(BaseInfiniteScroll)(({ theme }) => ({
  marginTop: '1rem',
  display: 'inline-flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
}));
