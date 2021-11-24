import MuiCard from '@mui/material/Card';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import TypographyBase from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export const Card = styled(MuiCard)(({ theme, accepts }) => {
  const { customColors } = theme;
  const acceptsColor = accepts === 'true' ? customColors.brand : customColors.danger;

  return {
    alignSelf: 'start',
    marginBottom: '1em',
    marginInline: '0.5em',
    width: '100%',
    borderLeft: `solid 4px ${acceptsColor}`,
    borderRadius: '5px',
    '.MuiCardContent-root:last-child': {
      paddingBottom: theme.spacing(1),
    },
  };
});

export const DataWrapper = styled(Stack)(({ theme }) => {
  return {
    flexDirection: 'column',
  };
});

export const MainInfo = styled(Stack)(({ theme }) => {
  return {
    width: '100%',
  };
});

export const OtherInfo = styled(Stack)(({ theme }) => {
  return {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 'auto',
  };
});

export const OtherInfoElement = styled(Stack)(({ theme }) => {
  return {
    flexDirection: 'row',
    alignItems: 'center',
    '> *:not(:first-of-type)': {
      marginLeft: theme.spacing(1),
    },
  };
});

export const AvailabilityInfo = styled(Stack)(({ theme }) => {
  return {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    cursor: 'help',
    minWidth: '74.5px',
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
export const Text = styled(TypographyBase)(({ theme }) => {
  return {
    fontSize: '0.75rem',
    fontWeight: 400,
    letterSpacing: 0,
    opacity: 0.56,
    lineHeight: 1.2,
  };
});

export const SubTitle = styled(Text)(({ theme }) => {
  return {
    fontWeight: 600,
  };
});
export const Title = styled(Text)(({ theme }) => {
  return {
    fontSize: '1.2rem',
    fontWeight: 700,
    opacity: 1,
    marginBottom: theme.spacing(0.5),
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
