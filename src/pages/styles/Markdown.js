import { styled } from '@mui/material/styles';

export const CustomContainer = styled('main')(({ theme }) => ({
  margin: '24px auto 0 auto',
  maxWidth: '730px',
  background: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    margin: '48px auto 65px auto',
    boxShadow: theme.MD.elementBoxShadow,
  },
}));

export const StaticPageWrapper = styled('div')(({ theme }) => ({
  fontSize: '14px',
  padding: '32px 17px 27px 17px',

  [theme.breakpoints.up('md')]: {
    margin: '32px 32px 27px 32px',
  },

  h1: { marginBottom: '32px', fontSize: '28px' },

  'h2, h3, h4': {
    marginBottom: '24px',
  },

  h2: { fontSize: '21px' },
  h3: { fontSize: '18px' },

  'p:not(:last-of-type)': {
    marginBottom: '28px',
  },

  'ul, ol': { paddingInlineStart: '40px', fontSize: '14px', marginBottom: '1rem' },

  'h1 + p > em': {
    display: 'block',
    fontSize: '16px',
    fontStyle: 'italic',
    color: theme.MD.linkColor,
    fontWeight: 400,
    lineHeight: 1.7,
    marginBottom: '48px',
    a: { fontSize: '16px' },
  },

  'p, a, span, strong': {
    fontSize: '14px',
    color: theme.MD.textColor,
    lineHeight: 1.7,
  },

  '* + h1, * + h2, * + h3': {
    marginTop: '48px',
  },

  a: {
    color: theme.MD.linkColor,
    fontWeight: 600,
    transition: 'all 0.35s ease-in-out',
    boxShadow: theme.MD.linkBoxShadow,
    textDecoration: 'none',

    '&:hover': {
      color: theme.MD.linkColor,
      fontWeight: 600,
      boxShadow: theme.MD.linkBoxShadowHover,
      textDecoration: 'none',
    },
    strong: { fontWeight: 600 },
  },

  'span[data-term]': {
    position: 'relative',
    display: 'inline-flex',
    justifyContent: 'center',
    outline: 'none',
    cursor: 'help',
    fontWeight: 600,
    transition: 'all 0.35s ease-in-out',
    color: 'rgba(0, 0, 0, 0.8)',

    '&:before ': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '-2px',
      borderBottom: `2px ${theme.customColors.brand} dotted`,
      zIndex: 1,
    },

    '&:hover::after': {
      content: 'attr(data-definition)',
      position: 'absolute',
      top: '90%',
      width: '100px',
      backgroundColor: theme.MD.dataTermBcgColor,
      color: 'white',
      border: '1px solid',
      padding: '3px 6px',
      margin: '10px',
      fontSize: '10px',
      fontWeight: 200,
      lineHeight: 1.4,
      zIndex: 2,
    },
  },

  'tr + tr': {
    marginTop: '27px',
  },
  table: {
    width: '100%',
    tableLayout: 'fixed',
    textAlign: 'left',
    marginBottom: '1rem',
    td: {
      padding: '15px 0',
      width: '50%',
      borderTop: `1px solid ${theme.MD.tableTdBorder}`,
    },
  },
}));
