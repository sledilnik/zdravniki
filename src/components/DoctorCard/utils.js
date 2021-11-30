export const toPercent = (availability = 0.0, lng = 'sl') =>
  new Intl.NumberFormat(`${lng}-${lng.toUpperCase()}`, {
    style: 'percent',
  }).format(availability);
