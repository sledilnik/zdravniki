import MarkerClusterGroup from 'react-leaflet-markercluster';
import PropTypes from 'prop-types';
import { MAP } from 'const';
import Leaflet from 'components/Shared/Leaflet';
import * as Markers from './Markers';
import MapEvents from './MapEvents';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { DoctorPropType } from '../../types';

const { GEO_LOCATION } = MAP;

function withLeaflet(Component) {
  const DoctorsMap = function DoctorsMap({
    doctors,
    center = GEO_LOCATION.SL_CENTER,
    zoom = MAP.ZOOM,
    minZoom = MAP.MIN_ZOOM,
    maxZoom = MAP.MAX_ZOOM,
    userLocation = false,
    ...other
  }) {
    const markers = doctors?.map(doctor => <Markers.Doctor key={doctor.key} doctor={doctor} />);
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
        {userLocation && <Markers.User />}
        <MapEvents />
      </Component>
    );
  };

  DoctorsMap.propTypes = {
    doctors: PropTypes.arrayOf(DoctorPropType),
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    userLocation: PropTypes.bool,
  };

  DoctorsMap.defaultProps = {
    doctors: [],
    center: GEO_LOCATION.SL_CENTER,
    zoom: MAP.ZOOM,
    minZoom: MAP.MIN_ZOOM,
    maxZoom: MAP.MAX_ZOOM,
    userLocation: false,
  };

  return DoctorsMap;
}

export default withLeaflet(Leaflet);
