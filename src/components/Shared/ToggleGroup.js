import * as React from 'react';
import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  fontSize: '0.75rem',
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.MuiToggleButton-root': {
      opacity: 0.56,
      color: theme.customColors.dark,
      letterSpacing: 0,
      fontWeight: 600,
      borderRadius: '24px',
      paddingInline: theme.spacing(2),
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

export default function ToggleGroup({ children, value, setValue, ...props }) {
  const handleValue = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
    }
  };
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        border: theme => `1px solid ${theme.palette.divider}`,
        background: theme => theme.customColors.background,
        borderRadius: '24px',
        flexWrap: 'wrap',
        width: 'max-content',
        marginInline: '8px',
        marginBlock: '16px',
        minHeight: '48px',
      }}
    >
      <StyledToggleButtonGroup
        size="small"
        value={value}
        exclusive
        onChange={handleValue}
        sx={{ borderRadius: '24px' }}
      >
        {children}
      </StyledToggleButtonGroup>
    </Paper>
  );
}
