import PropTypes from 'prop-types';
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

export const WrapperCenter = styled(Wrapper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 54px)',
  [theme.breakpoints.up('sm')]: {
    height: 'calc(100vh - 64px)',
  },
}));

export const Base = function Base() {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
};
export const Center = function Center({ component = 'div' }) {
  return (
    <WrapperCenter component={component}>
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    </WrapperCenter>
  );
};

Center.defaultProps = {
  component: 'div',
};

Center.propTypes = {
  component: PropTypes.oneOf(['div', 'main']),
};
export default Base;
