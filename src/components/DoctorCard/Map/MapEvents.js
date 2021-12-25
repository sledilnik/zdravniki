import { useMapEvents } from 'react-leaflet';

const MapEvents = function MapEvents({ geoLocation }) {
  const map = useMapEvents({
    zoomend() {
      map.setView(geoLocation);
    },
  });
  return null;
};

export default MapEvents;
