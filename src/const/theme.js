const colors = {
  accent: '#09AFDA',
  brand: '#26C5ED',
  danger: '#DC3435',
  success: '#95C83F',
  successDark: '#81B130',
  dark: '#212529',
  darkBlue: '#104856',
  lightGrey: '#CDCDCD',
  background: '#E8EFF0',
  backgroundLight: '#F4F8F8',
  borderLight: '#C4D4D7',
  text: 'rgba(0,0,0,.56)',
  textLight: '#777C80',
  link: 'rgba(33,37,41,0.56);',
  links: '#09AFDA',
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
        link: colors.links,
        address: colors.nickel,
        availability: colors.dark,
        load: colors.philippineSilver,
        type: colors.dark,
        chip: colors.dark,
        chipBcg1: '#F5F5F1',
        chipBcg2: '#EAEAE3',
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
    linkBoxShadow: `inset 0 0px 0 white, inset 0 -4px ${colors.brand}`,
    linkBoxShadowHover: `inset 0 0px 0 white, inset 0 -20px ${colors.brand}`,
    summaryBorder: '#DEDEDE',
    summaryText: 'rgba(0, 0, 0, 0.75)',
    tableTdBorder: 'rgba(0, 0, 0, 0.45)',
    dataTermBoxShadow: `inset 0 0 0 white, inset 0 -4px ${colors.brand}`,
    dataTermBoxShadowHover: `inset 0 0 0 white, inset 0 -20px ${colors.brand}`,
    dataTermBcgColor: '#414040',
  },
};

export default theme;
