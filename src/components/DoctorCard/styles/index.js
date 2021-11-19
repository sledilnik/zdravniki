import MuiCard from '@mui/material/Card';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import TypographyBase from '@mui/material/Typography';

export const Card = styled(MuiCard)(({ theme, accepts }) => {
  const { customColors } = theme;
  const acceptsColor = accepts === 'true' ? customColors.brand : customColors.danger;

  return {
    alignSelf: 'start',
    marginBottom: '1rem',
    marginRight: '1rem',
    width: '100%',
    borderLeft: `solid 4px ${acceptsColor}`,
    borderRadius: '5px',
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

export const Accepts = styled(TypographyBase)(({ theme, accepts }) => {
  const color = accepts === 'true' ? theme.customColors.brand : theme.customColors.danger;

  return {
    fontWeight: 700,
    letterSpacing: 0,
    color,
    whiteSpace: 'nowrap',
  };
});
export const Availability = styled(TypographyBase)(({ theme }) => {
  return {
    fontWeight: 700,
    letterSpacing: 0,
    color: 'inherit',
    whiteSpace: 'nowrap',
    opacity: theme.customOpacity.half,
  };
});
