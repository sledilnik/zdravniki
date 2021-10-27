import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
}));

export const WrapperCenter = styled(Wrapper)(({ theme }) => ({
  marginBlock: '50%',
  marginInline: 'auto',
}));
export const Base = () => (
  <Wrapper>
    <CircularProgress />
  </Wrapper>
);
export const Center = () => (
  <WrapperCenter>
    <CircularProgress />
  </WrapperCenter>
);

export default Base;
