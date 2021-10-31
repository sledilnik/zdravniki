import useMediaQuery from '@mui/material/useMediaQuery';
import json2mq from 'json2mq';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import { GEO_LOCATION } from 'const';
import Leaflet from 'components/Shared/Leaflet';
import * as Markers from './Markers';

function withLeaflet(Component) {
  const upXS = json2mq({ screen: true, minWidth: 350 });
  const defaultHeight = 500;
  const _mqHeights = [300, defaultHeight];

  const validateMqHeights = (mqHeights = []) => {
    if (_mqHeights.length === mqHeights.length) {
      return 'ok';
    }

    if (_mqHeights.length <= mqHeights.length) {
      console.warn(
        `You pass to many heights: ${mqHeights.length}! I will take first: ${_mqHeights.length}.`,
      );
      return 'more';
    }

    if (_mqHeights.length > mqHeights.length) {
      console.warn(
        `Not enough heights: ${mqHeights.length}! I will populate rest with default value: ${defaultHeight}.`,
      );
      return 'less';
    }
  };

  const DoctorMap = ({
    doctors,
    mqHeights = [..._mqHeights],
    center = GEO_LOCATION.SL_CENTER,
    zoom = 8,
    minZoom = 8,
    maxZoom = 16,
    ...other
  }) => {
    const isUpXS = useMediaQuery(upXS);

    const Heights = {
      ok: () => mqHeights,
      more: () => mqHeights.slice(0, _mqHeights.length),
      less: () => {
        const currentLength = mqHeights.length;
        const wantedLength = _mqHeights.length;
        const missingValues = Array.from(
          { length: wantedLength - currentLength },
          () => defaultHeight,
        );
        return [...mqHeights, ...missingValues];
      },
    };

    const getHeights = Heights[validateMqHeights(mqHeights)];
    const [xs, xl] = getHeights();

    const mapHeight = isUpXS ? xl : xs;
    const markers = doctors?.map(doctor => <Markers.Doctor key={doctor.id} doctor={doctor} />);
    const injectedProps = {
      center,
      zoom,
      minZoom,
      maxZoom,
      ...other,
      height: mapHeight,
    };

    /**
     * use mapHeight as key on MainMap to force re - render
     * Not sure why it didn't re-render on prop change
     */
    return (
      <Component key={mapHeight} {...injectedProps}>
        <MarkerClusterGroup maxClusterRadius={40}>{markers}</MarkerClusterGroup>
        <Markers.User />
      </Component>
    );
  };

  return DoctorMap;
}

export default withLeaflet(Leaflet);
