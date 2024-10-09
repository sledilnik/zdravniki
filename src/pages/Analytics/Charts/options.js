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
