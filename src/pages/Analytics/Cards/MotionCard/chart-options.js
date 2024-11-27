/** @import * as Types from "../../types" */

import { sloOBMap } from '../../data/sloOBGeoJson';

// import { dimensions } from '../../HighchartsOptions/options';

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
    height: 300,
  },
  colorAxis: {
    minColor: '#AAE8F8',
    maxColor: '#095568',
    startOnTick: true,
    endOnTick: true,
  },
  tooltip: {
    useHTML: true,
  },
  boost: {
    useGPUTranslations: true,
    usePreallocated: true,
  },
  series: [
    {
      type: 'map',
      mapData: sloOBMap,
      keys: ['OB_UIME', 'value'],
      joinBy: ['OB_UIME', 'name'],
      boostThreshold: 211,
    },
  ],
};
