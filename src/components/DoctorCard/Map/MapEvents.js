import { useMapEvents } from 'react-leaflet';
import PropTypes from 'prop-types';

const MapEvents = function MapEvents({ geoLocation }) {
  const map = useMapEvents({
    zoomend() {
      map.setView(geoLocation);
    },
  });
  return null;
};

Map.propTypes = {
  geoLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MapEvents;
