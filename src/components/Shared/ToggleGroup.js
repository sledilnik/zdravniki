import { styled } from '@mui/material/styles';

import MuiPaper from '@mui/material/Paper';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from 'prop-types';

const Paper = styled(MuiPaper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: aTheme => `1px solid ${aTheme.palette.divider}`,
  background: theme.customColors.background,
  borderRadius: '25px',
  flexWrap: 'wrap',
  width: 'min-content',
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  fontSize: '0.75rem',
  borderRadius: '25px',
  width: 'max-content',
  rippleVisible: {
    opacity: 0,
    animation: `$enter 550ms ${theme.transitions.easing.easeInOut}`,
  },
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    textTransform: 'none',
    padding: '11px 16px 11px 13px',
    transition: '0.3s all',
    transitionTimingFunction: 'ease-in',
    '&.MuiToggleButton-root': {
      opacity: 0.56,
      color: theme.customColors.dark,
      letterSpacing: 0,
      fontWeight: 600,
      borderRadius: '25px',
    },
    '&.Mui-disabled': {
      border: 0,
    },
    '&:hover': {
      opacity: 1,
      background: '#fff',
    },
    '&.Mui-selected': {
      color: theme.palette.common.white,
      background: theme.customColors.darkBlue,
      opacity: 1,
      '&:hover': {
        background: theme.customColors.dark,
      },
    },
  },
}));

const ToggleGroup = function ToggleGroup({ children, value, setValue, ...props }) {
  const handleValue = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
    }
  };
  return (
    <Paper elevation={0} {...props}>
      <StyledToggleButtonGroup size="small" value={value} exclusive onChange={handleValue}>
        {children}
      </StyledToggleButtonGroup>
    </Paper>
  );
};

ToggleGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default ToggleGroup;
