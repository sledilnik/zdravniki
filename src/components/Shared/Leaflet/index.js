import { styled } from '@mui/material/styles';
import { memo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export * as Markers from './Markers';

const Leaflet = function ({ children, height, ...other }) {
  return (
    <MapContainer style={{ height }} {...other}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

const StyledLeaflet = styled(Leaflet)(() => ({
  '.leaflet-tile-pane': {
    filter: 'hue-rotate(40deg) saturate(0.4) contrast(0.6) brightness(1.2)',
  },
}));

export default memo(StyledLeaflet);
