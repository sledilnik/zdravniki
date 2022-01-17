import { useLocation, useNavigate } from 'react-router-dom';
import { useMapEvents } from 'react-leaflet';
import { useFilter } from 'context/filterContext';

import { filterBySearchValueInMapBounds } from '../../utils';

const VSI = ['vsi', 'all'];
const Y = ['y', 'yes', 'd', 'da', 1];
const N = ['n', 'no', 'ne', 0];

const ACCEPTS = {
  vsi: VSI,
  y: Y,
  n: N,
};

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

      const oldHashValues = oldHash?.reduce(
        (acc, val) => {
          if (
            val?.startsWith('a-') &&
            Object.values(ACCEPTS).flat().includes(val.replace('a-', ''))
          ) {
            acc.accepts = val.replace('a-', '');
            return acc;
          }

          if (val?.startsWith('l-')) {
            const leaflet = val?.replace('l-', '').split('/');
            if (leaflet.length === 3) {
              const [zoom, lat, lng] = leaflet;
              acc.zoom = +zoom;
              acc.loc = [+lat, +lng];
              return acc;
            }
          }

          if (val?.startsWith('s-')) {
            acc.search = decodeURI(val.replace('s-', ''));
            return acc;
          }

          return acc;
        },
        {
          search: null,
          loc: null,
          zoom: null,
          accepts: null,
        },
      );

      const hash = `a-${oldHashValues.accepts}|l-${newZoom}/${[newCenter.lat, newCenter.lng].join(
        '/',
      )}|s-${oldHashValues.search}`;

      navigate(`./#${hash}`);
    },
  });
  return null;
};

export default MapEvents;
