import { memo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export * as Markers from './Markers';

const Leaflet = ({ children, height, ...other }) => {
  return (
    <MapContainer style={{ height }} {...other}>
      <TileLayer
        attribution='Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default memo(Leaflet);
