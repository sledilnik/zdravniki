import MuiCard from '@mui/material/Card';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

export const Card = styled(MuiCard)(({ theme, accepts }) => {
  const { palette } = theme;
  const acceptsColor = accepts === 'true' ? palette.success.main : palette.error.main;

  return {
    alignSelf: 'start',
    marginBottom: '1rem',
    marginRight: '1rem',
    width: '100%',
    borderLeft: `solid 4px ${acceptsColor}`,
  };
});

export const AvailabilityBadge = styled(Badge)(({ theme, color, badgeTextColor }) => {
  return {
    marginRight: '1rem',
    '& .MuiBadge-badge': {
      backgroundColor: theme.palette?.[color]?.main ?? color ?? theme.palette.grey[600],
      color: theme.palette?.[color]?.contrastText ?? badgeTextColor ?? theme.palette.common.white,
    },
  };
});
