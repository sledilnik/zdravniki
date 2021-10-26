import { geoLocation } from '../../constants';
import Leaflet, { Markers } from '../Shared/Leaflet';

function withLeaflet(Component) {
  const defaultGeoLocation = { lat: geoLocation.SL_CENTER[0], lon: geoLocation.SL_CENTER[1] };

  const DoctorMap = ({ doctor, height = '200px', ...other }) => {
    const {
      geoLocation: { lat, lon },
    } = doctor ?? { geoLocation: defaultGeoLocation };
    const position = [lat, lon];

    const injectedProps = {
      center: position,
      height,
      zoom: 13,
      dragging: false,
      zoomControl: false,
      scrollWheelZoom: false,
      ...other,
    };
    return (
      <Component {...injectedProps}>
        <Markers.LeafletMarker position={position} />
      </Component>
    );
  };

  return DoctorMap;
}

export default withLeaflet(Leaflet);
