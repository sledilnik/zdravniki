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

      const markersLatLng = [];
      event.target.eachLayer(layer => {
        if (layer?.getLatLng && map.getBounds().contains(layer.getLatLng())) {
          if (layer.options.pane === 'overlayPane') {
            markersLatLng.push(layer.getLatLng());
          }
          if (layer.options.pane === 'markerPane') {
            try {
              const childMarkers = layer.getAllChildMarkers && layer.getAllChildMarkers();
              childMarkers?.forEach(marker => markersLatLng.push(marker.getLatLng()));
            } catch (error) {
              console.log(layer);
              console.error(error);
            }
          }
        }
      });

      const doctorsFound = markersLatLng.map(LatLng => {
        const { lat, lng } = LatLng;
        const doctor = allDoctors.filter(
          ({ geoLocation }) => geoLocation.lat === lat && geoLocation.lon === lng,
        );
        return doctor;
      });
      const onlyIds = [...new Set(doctorsFound.flat().map(({ id }) => id))];
      allDoctors && setDoctors(allDoctors.filter(({ id }) => onlyIds.includes(id)));
    },
  });
  return null;
};

export default MapEvents;
