import { MAP } from 'const';
import Leaflet, { Markers } from 'components/Shared/Leaflet';

const { GEO_LOCATION } = MAP;

function withLeaflet(Component) {
  const defaultGeoLocation = { lat: GEO_LOCATION.SL_CENTER[0], lon: GEO_LOCATION.SL_CENTER[1] };

  const DoctorMap = ({ doctor, height = '200px', ...other }) => {
    const {
      geoLocation: { lat, lon },
    } = doctor ?? { geoLocation: defaultGeoLocation };
    const position = [lat, lon];

    const eventHandlers = {
      click: () => {
        other.handleRoomIconClick();
      },
    };

    const injectedProps = {
      center: position,
      height,
      zoom: 13,
      dragging: false,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      ...other,
    };
    return (
      <Component {...injectedProps}>
        <Markers.LeafletMarker position={position} eventHandlers={eventHandlers} />
      </Component>
    );
  };

  return DoctorMap;
}

export default withLeaflet(Leaflet);
