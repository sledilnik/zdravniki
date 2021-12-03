import { styled } from '@mui/material/styles';

import MuiPaper from '@mui/material/Paper';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Paper = styled(MuiPaper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: aTheme => `1px solid ${aTheme.palette.divider}`,
  background: theme.customColors.background,
  borderRadius: '24px',
  flexWrap: 'wrap',
  width: 'min-content',
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  fontSize: '0.75rem',
  borderRadius: '24px',
  width: 'max-content',
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.MuiToggleButton-root': {
      opacity: 0.56,
      color: theme.customColors.dark,
      letterSpacing: 0,
      fontWeight: 600,
      borderRadius: '24px',
    },
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: '24px',
    },
    '&:first-of-type': {
      borderRadius: '24px',
    },
    '&.Mui-selected': {
      color: theme.palette.common.white,
      background: theme.customColors.accent,
      opacity: 1,
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

export default ToggleGroup;
