/**
 * @typedef {import('highcharts-react-official').HighchartsReactRefObject} HighchartsReactRefObject
 */

/**
 * @typedef {HighchartsReactRefObject["chart"]} ChartRefProperty
 */

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

/** @typedef {("examples 1" | "examples 2")[]} SectionNames */

/**
 * @typedef {('top' | 'top-start' | 'start | 'end' | 'bottom' | 'bottom-start' | 'bottom-end' )} Placement
 */

/**
 * @typedef {Object} PopoverCustomOption
 * @property {string} label - The label of the option.
 * @property {React.MouseEventHandler<HTMLButtonElement>} onClick - The function to call when the option is clicked.
 * @property {React.JSX.Element} Icon - The icon to display next to the option.
 */

export default {};
