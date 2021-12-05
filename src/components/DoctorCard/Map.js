import { MAP } from 'const';
import Leaflet, { Markers } from 'components/Shared/Leaflet';
import MapEvents from './MapEvents';

const { GEO_LOCATION } = MAP;

function withLeaflet(Component) {
  const defaultGeoLocation = { lat: GEO_LOCATION.SL_CENTER[0], lon: GEO_LOCATION.SL_CENTER[1] };

  const DoctorMap = function DoctorMap({ doctor, handleRoomIconClick = () => {}, ...other }) {
    const {
      geoLocation: { lat, lon },
    } = doctor ?? { geoLocation: defaultGeoLocation };
    const position = [lat, lon];

    const eventHandlers = {
      click: () => {
        handleRoomIconClick();
      },
    };

    const injectedProps = {
      center: position,
      zoom: 10,
      dragging: false,
      minZoom: MAP.MIN_ZOOM,
      maxZoom: MAP.MAX_ZOOM,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      ...other,
    };
    return (
      <Component {...injectedProps}>
        <Markers.LeafletMarker position={position} eventHandlers={eventHandlers} />
        <MapEvents geoLocation={doctor?.geoLocation} />
      </Component>
    );
  };

  return DoctorMap;
}

export default withLeaflet(Leaflet);
