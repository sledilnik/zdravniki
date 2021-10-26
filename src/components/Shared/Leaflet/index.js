import { forwardRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export * as Markers from './Markers';

const Leaflet = forwardRef(({ children, height, ...other }, ref) => {
  return (
    <MapContainer ref={ref} style={{ height }} {...other}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
});

export default Leaflet;
