import L from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import { useFilter } from 'context/filterContext';

// TODO not finished yet -
const MapEvents = () => {
  const { allDoctors, setDoctors, ids } = useFilter();

  const map = useMapEvents({
    zoomend(event) {
      if (ids.length > 0) {
        return;
      }

      const bounds = map.getBounds();
      const mapDoctors = allDoctors?.filter(doctor => {
        const { lat, lon } = doctor.geoLocation;
        const corner = L.latLng(lat, lon);
        const _bounds = L.latLngBounds(corner, corner);
        return bounds.intersects(_bounds);
      });

      allDoctors && setDoctors(mapDoctors);
    },
    moveend(event) {
      if (ids.length > 0) {
        return;
      }

      const bounds = map.getBounds();
      const mapDoctors = allDoctors?.filter(doctor => {
        const { lat, lon } = doctor.geoLocation;
        const corner = L.latLng(lat, lon);
        const _bounds = L.latLngBounds(corner, corner);
        return bounds.intersects(_bounds);
      });

      allDoctors && setDoctors(mapDoctors);
    },
  });
  return null;
};

export default MapEvents;
