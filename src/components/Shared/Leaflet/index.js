import { styled } from '@mui/material/styles';
import { memo } from 'react';
import { MapContainer, AttributionControl, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';

export * as Markers from './Markers';

const Leaflet = function Leaflet({ children, height, ...other }) {
  return (
    <MapContainer style={{ height }} attributionControl={false} {...other}>
      <AttributionControl prefix="" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

Leaflet.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

const StyledLeaflet = styled(Leaflet)(() => ({
  '.leaflet-tile-pane': {
    filter: 'hue-rotate(40deg) saturate(0.4) contrast(0.6) brightness(1.2)',
  },
}));

export default memo(StyledLeaflet);
