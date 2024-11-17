/** @import * as Types from "../types" */

import examples from './examples';
import { availabilityChangeByInstitutionType } from './production/availability-change-by-institution-type';

export const charts = [availabilityChangeByInstitutionType, ...Object.values(examples)];

const groupedCharts = charts.reduce((acc, chart) => {
  const { section } = chart;
  if (!acc[section]) {
    acc[section] = [];
  }
  acc[section].push(chart);
  return acc;
}, {});

/**
 * @type {Array<{sectionTitle: Types.SectionNames[number], charts: Types.ChartData[]}>}
 */
export const SECTIONS = Object.keys(groupedCharts).map(section => ({
  sectionTitle: section,
  charts: groupedCharts[section].sort((a, b) => a.order - b.order),
}));
