import { GEO_LOCATION } from 'const';
import Leaflet, { Markers } from 'components/Shared/Leaflet';

function withLeaflet(Component) {
  const defaultGeoLocation = { lat: GEO_LOCATION.SL_CENTER[0], lon: GEO_LOCATION.SL_CENTER[1] };

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
