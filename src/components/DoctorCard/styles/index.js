import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import TypographyBase from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';

export * as PageInfo from './PageInfo';

const Card = styled(MuiCard)(({ theme }) => {
  return {
    marginInline: '0.5em',
    borderRadius: '5px',

    letterSpacing: 0,
    lineHeight: 1.2,
  };
});

export const PageInfoCard = styled(Card)(({ theme, accepts }) => {
  const { customColors } = theme;
  const acceptsColor = accepts === 'true' ? customColors.brand : customColors.danger;
  return {
    width: '100%',
    marginTop: '1em',
    borderTop: `solid 4px ${acceptsColor}`,
    '.MuiTypography-h1': {
      fontSize: '1.8rem',
      fontWeight: 700,
      color: theme.customColors.doctor.colors.name,
      marginBottom: theme.spacing(0.5),
    },
    '.MuiTypography-h2': {
      fontSize: '1rem',
      fontWeight: 700,
      color: theme.customColors.doctor.colors.provider,
    },
    'address.MuiTypography-body2': {
      color: theme.customColors.doctor.colors.address,
      fontSize: '0.875rem',
      lineHeight: '0.875rem',
      fontStyle: 'normal',
    },
    '.MuiCardContent-root:last-child': {
      paddingTop: 0,
      paddingInline: 0,
    },
    '.MuiTypography-caption': {
      lineHeight: 1.2,
    },
  };
});
export const InfoCard = styled(Card)(({ theme, accepts }) => {
  const { customColors } = theme;
  const acceptsColor = accepts === 'true' ? customColors.brand : customColors.danger;

  return {
    justifySelf: 'center',
    width: '98%',
    borderLeft: `solid 4px ${acceptsColor}`,
    '.MuiTypography-h2': {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: theme.customColors.doctor.colors.name,
      marginBottom: theme.spacing(0),
    },
    '.MuiTypography-h3': {
      fontSize: '0.75rem',
      fontWeight: 700,
      color: theme.customColors.doctor.colors.provider,
    },
    'address.MuiTypography-body2': {
      color: theme.customColors.doctor.colors.address,
      fontSize: '0.75rem',
      lineHeight: '0.75rem',
      fontStyle: 'normal',
    },
    '.MuiCardContent-root:last-child': {
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up('sm')]: {
      width: '95%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '90%',
    },
  };
});

export const InfoWrapper = styled(Stack)(({ theme }) => {
  return {
    color: theme.customColors.doctor.availability,
    cursor: 'help',
    minWidth: '74.5px',
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
    ':last-of-type': { opacity: 0.3 },
  };
});

export const Link = styled(MuiLink)(({ theme }) => {
  return {
    fontSize: 'inherit',
    fontWeight: 700,
    color: theme.customColors.doctor.colors.link,
    cursor: 'pointer',
  };
});
