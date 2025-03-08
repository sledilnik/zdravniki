/**
 * Those names are just for grouping the sections in the sidebar.
 * The actual section title is translated.
 */
export const sectionNames = Object.freeze(['Dostopnost do primarne zdravstvene oskrbe']);

/**
 * @typedef {typeof sectionNames[number]} SectionName
 */

/**
 * @typedef {import('highcharts-react-official').HighchartsReactRefObject} HighchartsReactRefObject
 */

/**
 * @typedef {import('highcharts-react-official').HighchartsReactProps} HighchartsReactProps
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
 * @property {SectionName[number]} section
 * @property {number} order
 * @property {string} id
 * @property {string} titleTranslationKey
 * @property {"ChartCard" } componentName
 * @property {React.CSSProperties["minHeight"] fakeHeight
 */

/**
 * @typedef {Object} MapData
 * @property {SectionName[number]} section
 * @property {number} order
 * @property {string} id
 * @property {"MapCard"} componentName
 * @property {HighMapsOptions} options
 */

/**
 * @typedef {("top" | "top-start" | "start" | "end" | "bottom" | "bottom-start" | "bottom-end" )} Placement
 */

/**
 * @typedef {Object} PopoverCustomOption
 * @property {string} label - The label of the option.
 * @property {React.MouseEventHandler<HTMLButtonElement>} onClick - The function to call when the option is clicked.
 * @property {React.JSX.Element} Icon - The icon to display next to the option.
 */

/**
 * @typedef {Object} Section
 * @property {string} section
 * @property {number} order
 * @property {string} componentName
 * @property {string} titleTranslationKey
 * @property {React.CSSProperties["minHeight"]} fakeHeight
 * @property {string} [title]
 */

export default {};
