export const time = {
  timezone: 'Europe/Ljubljana',
};

export const lang = {
  accessibility: {
    chartContainerLabel: 'Title: {title}.',
  },
  downloadPDF: 'Prenesi PDF',
  downloadPNG: 'Prenesi PNG',
  downloadJPEG: 'Prenesi JPEG',
  downloadSVG: 'Prenesi SVG',
  printChart: 'Natisni graf',
  viewFullscreen: 'Celozaslonski pogled',
  exitFullscreen: 'Zapri celozaslonski pogled',
  decimalPoint: ',',
  thousandsSep: '.',
  numericSymbols: [' tis.', ' mio.', ' mlrd.', ' t'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
  months: [
    'Januar',
    'Februar',
    'Marec',
    'April',
    'Maj',
    'Junij',
    'Julij',
    'Avgust',
    'September',
    'Oktober',
    'November',
    'December',
  ],
  weekdays: ['Nedelja', 'Ponedeljek', 'Torek', 'Sreda', 'Četrtek', 'Petek', 'Sobota'],
  shortWeekdays: ['Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob'],
};

export const baseOptions = {
  lang,
  time,
  exporting: {
    enabled: false, // it's not working. Fetch error
    menuItemDefinitions: {},
    buttons: {
      contextButton: {
        menuItems: [
          // on mobile full screen does not work, at least not on iOS
          'viewFullscreen',
          'printChart',
          'separator',
          'downloadPNG',
          'downloadJPEG',
          'downloadPDF',
          'downloadSVG',
        ],
      },
    },
    type: ['image/png', 'image/jpeg', 'application/pdf', 'image/svg+xml'],
  },
  chart: {
    className: 'font-sans',
  },
};

export const srOnly = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0',
};

export const notSrOnly = {
  position: 'absolute',
  width: 'auto',
  height: 'auto',
  padding: '0',
  margin: '0',
  overflow: 'visible',
  clip: 'auto',
  whiteSpace: 'normal',
};

export const chartEvents = {
  beforePrint() {
    this.update({
      legend: {
        enabled: true,
      },
      title: {
        style: {
          ...notSrOnly,
        },
      },
      subtitle: {
        style: {
          ...notSrOnly,
        },
      },
      caption: {
        style: {
          ...notSrOnly,
        },
      },
    });
  },
  afterPrint() {
    this.update({
      legend: {
        enabled: false,
      },
      title: {
        style: {
          ...srOnly,
        },
      },
      subtitle: {
        style: {
          ...srOnly,
        },
      },
      caption: {
        style: {
          ...srOnly,
        },
      },
    });
  },
};

export const commonOptions = {
  exporting: {
    chartOptions: {
      legend: { enabled: true },
    },
  },
  legend: {
    enabled: false,
    useHTML: true,
  },
  chart: {
    type: 'column',
    events: { ...chartEvents },
  },
  title: {
    text: 'Column',
    useHTML: true,
    style: {
      ...srOnly,
    },
  },
  subtitle: {
    text: 'Subtitle',
    useHTML: true,
    style: {
      ...srOnly,
    },
  },
  caption: {
    text: 'Caption',
    useHTML: true,
    style: {
      ...srOnly,
    },
  },
};

export const titleOptions = {
  useHTML: true,
  style: {
    ...srOnly,
  },
};
