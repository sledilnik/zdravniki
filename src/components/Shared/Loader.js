import { styled } from '@mui/material/styles';
import MuiCircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CircularProgress = styled(MuiCircularProgress)(({ theme }) => ({
  color: theme.customColors.brand,
}));

const Wrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
}));

export const WrapperCenter = styled(Wrapper)(() => ({
  height: '100vh',
  alignItems: 'center',
}));
export const Base = function Base() {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
};
export const Center = function Center() {
  return (
    <WrapperCenter>
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    </WrapperCenter>
  );
};

export default Base;
