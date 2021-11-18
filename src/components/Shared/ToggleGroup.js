import * as React from 'react';
import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function ToggleGroup({ children, value, setValue }) {
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
        flexWrap: 'wrap',
        width: 'max-content',
      }}
    >
      <StyledToggleButtonGroup
        size="small"
        value={value}
        exclusive
        onChange={handleValue}
        aria-label="text alignment"
      >
        {children}
      </StyledToggleButtonGroup>
    </Paper>
  );
}
