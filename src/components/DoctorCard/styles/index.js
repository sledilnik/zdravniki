import { styled } from '@mui/material/styles';
import {
  Menu,
  Stack,
  Card as MuiCard,
  Typography as TypographyBase,
  Link as MuiLink,
} from '@mui/material';

export * as PageInfo from './PageInfo';

const Card = styled(MuiCard)(() => ({
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
    display: 'flex',
    '.MuiCardMedia-root': {
      display: 'flex',
      width: '100%',
      height: '100%',

      '.leaflet-container': {
        zIndex: 1,
        width: '100%',
        height: '350px',
        borderRadius: '0 0 5px 5px',
      },
      [theme.breakpoints.up('md')]: {
        '.leaflet-container': {
          borderRadius: '0 5px 5px 0',
          height: '100%',
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
    padding: '0',
    background: '#F4F8F8',
    borderBottom: `1px solid #DCE8E9`,
    position: 'relative',
    display: 'flex',
    '.MuiCardContent-root': {
      padding: '20px 24px 10px',
      flexGrow: 1,
    },
    '.MuiCardActions-root': {
      padding: '15px 10px',
      display: 'flex',

      '> div': {
        display: 'flex',
        height: '100%',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
    },
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
      a: {
        color: theme.customColors.dark,
        '&:hover': {
          color: theme.customColors.links,
        },
      },
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
    '.MuiIconButton-root': {
      '&.Mui-disabled': {
        opacity: 0.3,
      },
    },
  };
});

export const MoreMenu = styled(Menu)(({ theme }) => ({
  li: {
    fontSize: '13px',
    '.MuiListItemIcon-root': {
      minWidth: '30px',
      svg: {
        width: '16px',
      },
    },
  },
  a: {
    color: theme.customColors.dark,
    fontWeight: 'normal',
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
  },
}));

export const InfoWrapper = styled(Stack)(({ theme }) => ({
  color: theme.customColors.doctor.availability,
  cursor: 'help',
  position: 'relative',
}));

export const AcceptsStack = styled(Stack)(({ theme, accepts }) => {
  const color = accepts === 'y' ? theme.customColors.successDark : theme.customColors.danger;

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
    margin: '11px 0',

    svg: {
      width: '14px',
      height: '14px',
      filter: 'brightness(10)',
      opacity: '0.7',
      margin: '0 5px 0 0',
    },

    '@media print': {
      color,
      svg: {
        display: 'none',
      },
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

export const IsSpecial = styled(Stack)(({ theme, type, viewType }) => {
  let iconSize = '18px';
  let bgColor = theme.customColors.doctor.colors.extraClinicBgColor;
  let txtColor = theme.customColors.doctor.colors.extraClinicColor;
  if (type === 'floating') {
    bgColor = theme.customColors.lightBlue;
    txtColor = theme.customColors.darkBlue;
  }
  let padding = '5px 7px';
  let iconMargin = '0';
  let iconOpacity = '1';
  let margin = '0 0 0 10px';

  if (viewType === 'page') {
    iconMargin = '0 5px 0 0';
    padding = '5px 8px';
    iconOpacity = '0.7';
    if (type === 'floating') {
      iconOpacity = '1';
    }
  } else if (viewType === 'list') {
    iconSize = '22px';
    padding = '1px 6px';
    margin = 0;
    bgColor = 'transparent';
  }

  return {
    fontWeight: 400,
    fontSize: '12px',
    background: bgColor,
    color: txtColor,
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    cursor: 'help',
    padding,
    margin,
    display: 'inline-flex',
    alignItems: 'center',
    letterSpacing: '0.3px',
    svg: {
      width: iconSize,
      height: iconSize,
      opacity: iconOpacity,
      margin: iconMargin,
    },
  };
});
