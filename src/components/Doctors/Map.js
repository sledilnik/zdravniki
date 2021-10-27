import MarkerClusterGroup from 'react-leaflet-markercluster';

import { GEO_LOCATION } from '../../constants';
import Leaflet from 'components/Shared/Leaflet';
import * as Markers from './Markers';

function withLeaflet(Component) {
  const DoctorMap = props => {
    const { doctors, center = GEO_LOCATION.SL_CENTER, height = '500px', ...other } = props;

    const markers = doctors?.map(doctor => <Markers.Doctor key={doctor.id} doctor={doctor} />);
    const injectedProps = {
      center,
      height,
      zoom: 8,
      minZoom: 8,
      maxZoom: 16,
      ...other,
    };
    return (
      <Component {...injectedProps}>
        <MarkerClusterGroup>{markers}</MarkerClusterGroup>
        <Markers.User />
      </Component>
    );
  };

  return DoctorMap;
}

export default withLeaflet(Leaflet);
