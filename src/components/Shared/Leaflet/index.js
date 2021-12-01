import { memo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export * as Markers from './Markers';

const Leaflet = ({ children, height, ...other }) => {
  return (
    <MapContainer style={{ height }} {...other}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default memo(Leaflet);
