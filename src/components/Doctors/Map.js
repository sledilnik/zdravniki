import MarkerClusterGroup from 'react-leaflet-markercluster';

import { MAP } from 'const';
import Leaflet from 'components/Shared/Leaflet';
import * as Markers from './Markers';
import MapEvents from './MapEvents';

const { GEO_LOCATION } = MAP;

function withLeaflet(Component) {
  // const upXSWidth = json2mq({ screen: true, minWidth: SIZES.DEVICES.xs });
  // const upXSHeight = json2mq({ screen: true, minHeight: SIZES.DEVICES.s });

  const DoctorsMap = ({
    doctors,
    center = GEO_LOCATION.SL_CENTER,
    zoom = MAP.ZOOM,
    minZoom = MAP.MIN_ZOOM,
    maxZoom = MAP.MAX_ZOOM,
    ...other
  }) => {
    // const isUpXS = useMediaQuery(upXSWidth);
    // const isUpXSHeight = useMediaQuery(upXSHeight);

    const markers = doctors?.map(doctor => <Markers.Doctor key={doctor.id} doctor={doctor} />);
    const injectedProps = {
      center,
      zoom,
      minZoom,
      maxZoom,
      ...other,
      height: '100%',
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
