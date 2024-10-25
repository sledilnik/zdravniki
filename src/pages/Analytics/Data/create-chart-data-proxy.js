/** @import * as Types from "../../types" */

/**
 * Creates a proxy object for handling chart data operations.
 * The proxy intercepts property access to provide custom functionality:
 * - If the property is 'id', returns a formatted version of the chart title.
 * - If the property is 'mergedOptions', returns the merged options of the target and common options.
 * @param {(Types.ChartData | Types.MapData)} obj - The target object to proxy.
 * @returns {Proxy} - A new Proxy instance for the target object with custom property access behavior.
 */
export function createChartDataProxy(obj) {
  const handler = {
    get(target, prop, _receiver) {
      if (prop === 'id') {
        return encodeURIComponent(
          target.options.title.text.trim().toLowerCase().replace(/\s/g, '-'),
        );
      }

      // eslint-disable-next-line prefer-rest-params
      return Reflect.get(...arguments);
    },
  };
  return new Proxy(obj, handler);
}
