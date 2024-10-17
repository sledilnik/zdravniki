/**
 * @typedef {import('highcharts').Options} HighchartsOptions
 */

/**
 * @typedef {import('highcharts/highmaps').Options} HighMapsOptions
 */

/**
 * @typedef {Object} ChartData
 * @property {SectionNames[number]} section
 * @property {number} order
 * @property {string} id
 * @property {"ChartCard" } componentName
 * @property {HighchartsOptions} options
 */
/**
 * @typedef {Object} MapData
 * @property {SectionNames[number]} section
 * @property {number} order
 * @property {string} id
 * @property {"MapCard"} componentName
 * @property {HighMapsOptions} options
 */

/** @typedef {("examples" | "section")[]} SectionNames */

export default {};
