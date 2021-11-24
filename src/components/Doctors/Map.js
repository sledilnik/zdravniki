import MarkerClusterGroup from 'react-leaflet-markercluster';

import { MAP } from 'const';
import Leaflet from 'components/Shared/Leaflet';
import * as Markers from './Markers';
import MapEvents from './MapEvents';

const { GEO_LOCATION } = MAP;

function withLeaflet(Component) {
  const DoctorsMap = ({
    doctors,
    center = GEO_LOCATION.SL_CENTER,
    zoom = MAP.ZOOM,
    minZoom = MAP.MIN_ZOOM,
    maxZoom = MAP.MAX_ZOOM,
    ...other
  }) => {
    const markers = doctors?.map(doctor => <Markers.Doctor key={doctor.id} doctor={doctor} />);
    const injectedProps = {
      center,
      zoom,
      minZoom,
      maxZoom,
      ...other,
    };

    return (
      <Component {...injectedProps}>
        <MarkerClusterGroup maxClusterRadius={40}>{markers}</MarkerClusterGroup>
        <Markers.User />
        <MapEvents />
      </Component>
    );
  };

  return DoctorsMap;
}

export default withLeaflet(Leaflet);
