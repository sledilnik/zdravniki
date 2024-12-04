/** @import * as Types from "../types" */

/**
 * TODO
 *  - check for actual fake height values; card height can be different on mobile or desktop or other devices:
 *  fakeHeight is needed to simulate the height of the card in the editor so the scrolling is correct if card is not rendered yet
 *  and user navigates to it via the sidebar
 *
 */

import { mapOptions as RichInfoClickOptions } from '../Cards/RichInfoClick/chart-options';
import { mapOptions as RomanLustrikCardMapOptions } from '../Cards/DataByYearAndAgeGroupCard/char-options';
import { availabilityChangeByInstitutionType } from './production/availability-change-by-institution-type';

export const charts = [
  {
    section: 'real section 1',
    order: 5,
    componentName: 'MotionCard',
    fakeHeight: '2876px',
    options: {
      title: {
        text: 'MotionCard',
      },
    },
  },
  {
    section: 'real section 1',
    order: 0,
    componentName: 'DashboardCard',
    fakeHeight: '683px',
    options: {
      title: {
        text: 'Dashboard',
      },
    },
  },
  availabilityChangeByInstitutionType,
  {
    section: 'real section 1',
    order: 1,
    componentName: 'DataByYearAndAgeGroupCard',
    fakeHeight: '1358px',
    options: {
      title: {
        text: RomanLustrikCardMapOptions.title.text
          ? RomanLustrikCardMapOptions.title.text
          : 'Missing Title',
      },
    },
  },
  {
    section: 'real section 1',
    order: 2,
    componentName: 'RichInfoClick',
    fakeHeight: '822px',
    options: {
      title: {
        text: RichInfoClickOptions.title.text ? RichInfoClickOptions.title.text : 'Missing Title',
      },
    },
  },
];

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
