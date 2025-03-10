import { groupYAxisLabelFormat } from '../Cards/TaskD/parsed-files';

/**
 * Checks if the browser supports fullscreen mode for a given element.
 *
 * @param {Element} element - The element to check for fullscreen support.
 * @returns {boolean} - True if fullscreen is supported, false otherwise.
 */
export function getIsRequestFullscreenSupported(element) {
  const requestFullscreenMethods = [
    'requestFullscreen',
    'webkitRequestFullscreen', // Safari
    'mozRequestFullScreen', // Firefox
    'msRequestFullscreen', // Internet Explorer/Edge
  ];

  return requestFullscreenMethods.some(method => element[method]);
}

/**

 * @function prepareYAxisLabelFormat
 * @param {TaskDTypes.FileKey} label - Selected value from the filter.
 * @returns {TaskDTypes.YAxisLabelFormatValue} Formatted label based on the selected value.
 */
export const prepareYAxisLabelFormat = label => groupYAxisLabelFormat[label];

/**

 * @function labelsFormatter
 * @param {TaskDTypes.FileKey} selectedValue - Selected value from the filter.
 * @param {string} lng - Language code.
 * @returns {string} Formatted label based on the selected value and language.
 */
export function labelsFormatter(selectedValue, lng) {
  if (!selectedValue || !lng) {
    throw new Error('Both selectedValue and lng are required.');
  }

  const labelFormat = prepareYAxisLabelFormat(selectedValue);
  const localeBase = lng.split('-')[0] || 'en';
  const suffixMap = {
    sl: 'tis.',
    en: 'k',
  };

  const { value } = this;
  if (value == null) return '';

  if (labelFormat === 'percent') {
    return new Intl.NumberFormat(lng, {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value / 100);
  }

  const isOverMillion = value >= 1_000_000;
  const suffix = isOverMillion ? suffixMap[localeBase] || 'k' : '';
  const valueToFormat = isOverMillion ? value / 1_000 : value;

  return `${new Intl.NumberFormat(lng, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: 'auto',
  }).format(valueToFormat)} ${suffix}`.trim();
}
