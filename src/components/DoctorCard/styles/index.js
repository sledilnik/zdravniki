import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import TypographyBase from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';

export * as PageInfo from './PageInfo';

const Card = styled(MuiCard)(() => ({
  // marginInline: '0.5em',
  borderRadius: '0',
  boxShadow: 'none',

  letterSpacing: 0,
  lineHeight: 1.2,
}));

export const PageInfoCard = styled(Card)(({ theme, accepts }) => {
  const { customColors } = theme;
  const acceptsColor = accepts === 'true' ? customColors.success : customColors.danger;
  return {
    width: '100%',
    borderRadius: '5px',
    marginTop: '1em',
    background: '#fff',
    boxShadow: '1px 1px 4px 0 rgba(0,0,0,0.08)',
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

    [theme.breakpoints.up('sm')]: {
      marginInline: '24px',
      '.MuiTypography-h1': {
        fontSize: '2rem',
        marginBottom: theme.spacing(1),
      },
    },
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
      marginInline: '48px',
      borderTop: 0,
      borderLeft: `solid 4px ${acceptsColor}`,
    },
    [theme.breakpoints.up('lg')]: {
      marginInline: '108px',
    },
  };
});

export const PageInfoBox = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },

  '.MuiCardContent-root:last-child': {
    paddingBottom: 0,
  },

  '.MuiCardContent-root': {
    width: '100%',
    '.MuiCardMedia-root': {
      background: 'green',
      '.leaflet-container': {
        height: '250px',
      },
      [theme.breakpoints.up('sm')]: {
        '.leaflet-container': {
          height: '350px',
        },
      },
      [theme.breakpoints.up('md')]: {
        '.leaflet-container': {
          height: 'clamp(400px, 50vh, 100vh)', // ? not sure but it's working
        },
      },
    },
  },
}));
export const InfoCard = styled(Card)(({ theme, accepts }) => {
  const { customColors } = theme;
  const acceptsColor = accepts === 'true' ? customColors.success : customColors.danger;

  return {
    justifySelf: 'center',
    width: '100%',
    padding: '20px 24px 10px',
    background: '#F4F8F8',
    borderBottom: `1px solid #DCE8E9`,
    position: 'relative',
    '&:before': {
      content: `''`,
      position: 'absolute',
      transition: '0.1s all',
      left: 0,
      top: 0,
      bottom: 0,
      width: 0,
      background: acceptsColor,
    },
    '&:hover': {
      '&:before': {
        width: '4px',
      },
    },
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
  };
});

export const InfoWrapper = styled(Stack)(({ theme }) => ({
  color: theme.customColors.doctor.availability,
  cursor: 'help',
  minWidth: '74.5px',
}));

export const AcceptsStack = styled(Stack)(({ theme, accepts }) => {
  const color = accepts ? theme.customColors.successDark : theme.customColors.danger;

  return {
    fontWeight: 700,
    fontSize: '10px',
    background: color,
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    padding: '5px 7px 5px 5px',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.3px',

    svg: {
      width: '14px',
      height: '14px',
      filter: 'brightness(10)',
      opacity: '0.7',
      margin: '0 5px 0 0',
    },
  };
});

export const Accepts = styled(TypographyBase)(({ theme, accepts }) => {
  const color = accepts ? theme.customColors.brand : theme.customColors.danger;

  return {
    fontWeight: 700,
    letterSpacing: 0,
    color,
    whiteSpace: 'nowrap',
  };
});

export const Availability = styled(TypographyBase)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: 0,
  color: 'inherit',
  whiteSpace: 'nowrap',
  opacity: theme.customOpacity.half,
}));

export const Link = styled(MuiLink)(({ theme }) => ({
  fontSize: 'inherit',
  fontWeight: 700,
  color: theme.customColors.doctor.colors.link,
  cursor: 'pointer',
}));
