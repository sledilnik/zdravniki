import { useLocation, useNavigate } from 'react-router-dom';
import { useMapEvents } from 'react-leaflet';
import { useFilter } from 'context/filterContext';
import { filterBySearchValueInMapBounds, reduceHash } from 'utils';

const MapEvents = function MapEvents() {
  const { allDoctors, setDoctors, searchValue } = useFilter();
  const location = useLocation();
  const navigate = useNavigate();

  const map = useMapEvents({
    moveend() {
      if (!allDoctors) return;

      const bounds = map.getBounds();
      const mapDoctors = filterBySearchValueInMapBounds({
        bounds,
        filtered: allDoctors,
        searchValue,
      });
      setDoctors(mapDoctors);
      const newZoom = map.getZoom();
      const newCenter = map.getCenter();

      const oldHash = location.hash.replace('#', '').split('|');

      const oldHashValues = oldHash?.reduce(reduceHash, {
        search: null,
        loc: null,
        zoom: null,
        accepts: null,
      });

      const hash = `a-${oldHashValues.accepts}|l-${newZoom}/${[
        newCenter.lat.toFixed(5),
        newCenter.lng.toFixed(5),
      ].join('/')}|s-${oldHashValues.search}`;

      navigate(`./#${hash}`, { replace: true });
    },
  });
  return null;
};

export default MapEvents;
