import { styled } from '@mui/material/styles';
import MuiCircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CircularProgress = styled(MuiCircularProgress)(({ theme }) => ({
  color: theme.customColors.brand,
}));

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
}));

export const WrapperCenter = styled(Wrapper)(({ theme }) => ({
  height: '100%',
  alignItems: 'center',
}));
export const Base = () => (
  <Wrapper>
    <CircularProgress />
  </Wrapper>
);
export const Center = () => (
  <WrapperCenter>
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  </WrapperCenter>
);

export default Base;
