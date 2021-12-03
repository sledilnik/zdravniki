import L from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import { useFilter } from 'context/filterContext';

const MapEvents = function () {
  const { allDoctors, setDoctors, ids, searchValue } = useFilter();

  const map = useMapEvents({
    moveend() {
      if (ids.length > 0) {
        return;
      }

      const bounds = map.getBounds();
      const mapDoctors = allDoctors?.filter(doctor => {
        const { lat, lon } = doctor.geoLocation;
        const corner = L.latLng(lat, lon);
        const _bounds = L.latLngBounds(corner, corner);

        if (!searchValue) {
          return bounds.intersects(_bounds);
        }

        const isBySearchValue =
          doctor.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          doctor.searchAddress.toLowerCase().includes(searchValue.toLowerCase()) ||
          doctor.provider.toLowerCase().includes(searchValue.toLowerCase());

        return bounds.intersects(_bounds) && isBySearchValue;
      });

      if (allDoctors) setDoctors(mapDoctors);
    },
  });
  return null;
};

export default MapEvents;
