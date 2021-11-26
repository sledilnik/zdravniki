import { styled } from '@mui/material/styles';
import MarkdownBase from 'markdown-to-jsx';

export const CustomContainer = styled('div')(({ theme }) => {
  return {
    margin: '24px auto 0 auto',
    maxWidth: '730px',
    '@media only screen and (min-width: 768px)': {
      margin: '48px auto 65px auto',
      boxShadow: theme.MD.elementBoxShadow,
    },
  };
});

export const StaticPageWrapper = styled('div')(({ theme }) => {
  return {
    padding: '32px 17px 27px 17px',
    background: theme.palette.common.white,

    '@media only screen and (min-width: 768px)': {
      margin: '32px 32px 27px 32px',
    },
  };
});

export const Markdown = styled(MarkdownBase)(({ theme }) => {
  return {
    h1: { marginBottom: '32px', fontSize: '28px' },

    'h2, h3, h4': {
      marginBottom: '24px',
    },

    h2: { fontSize: '21px' },
    h3: { fontSize: '18px' },

    'p:not(:last-of-type)': {
      marginBottom: '28px',
    },

    ul: { paddingInlineStart: '40px', fontSize: '14px' },

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
  };
});
