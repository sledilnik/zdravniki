import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import HighchartsReact from 'highcharts-react-official';
import HighMaps from 'highcharts/highmaps';

export const MapChart = forwardRef(({ options }, ref) => (
  <figure>
    <HighchartsReact ref={ref} highcharts={HighMaps} constructorType="mapChart" options={options} />
  </figure>
));

MapChart.propTypes = {
  options: PropTypes.shape({}).isRequired,
};
