const colors = {
  accent: '#09AFDA',
  brand: '#95C83F',
  danger: '#DC3435',
  dark: '#212529',
  lightGrey: '#CDCDCD',
  background: '#F0F0E8',
  text: 'rgba(0,0,0,.56)',
  link: 'rgba(33,37,41,0.56);',
  nickel: '#6C7074',
  philippineSilver: '#B1B1B1',
};

const theme = {
  typography: {
    fontFamily: ['IBM Plex Sans', 'Roboto', 'sans-serif'].join(','),
  },
  customColors: {
    ...colors,
    doctor: {
      colors: {
        name: colors.dark,
        provider: colors.dark,
        link: colors.accent,
        address: colors.nickel,
        availability: colors.dark,
        load: colors.philippineSilver,
        type: colors.dark,
      },
      opacity: {
        type: 0.56,
      },
    },
  },
  customOpacity: {
    half: 0.56,
  },
  MD: {
    textColor: 'rgba(0, 0, 0, 0.7)',
    linkColor: 'rgba(0, 0, 0, 0.8)',
    elementBoxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.15)',
    linkBoxShadow: 'inset 0 -1px 0 white, inset 0 -4px #95C83F',
    linkBoxShadowHover: 'inset 0 -1px 0 white, inset 0 -20px #95C83F',
  },
};

export default theme;
