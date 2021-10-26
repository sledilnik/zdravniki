import Leaflet, { Markers } from '../Shared/Leaflet';

function withLeaflet(Component) {
  const DoctorMap = ({ doctor, height, ...other }) => {
    const {
      geoLocation: { lat, lon },
    } = doctor ?? { geoLocation: { lat: 45, lon: 14 } };
    const position = [lat, lon];
    const injectedProps = {
      ...other,
      center: position,
      height,
      zoom: 13,
      dragging: false,
      zoomControl: false,
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
