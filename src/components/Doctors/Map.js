import useMediaQuery from '@mui/material/useMediaQuery';
import json2mq from 'json2mq';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import { MAP, SIZES } from 'const';
import Leaflet from 'components/Shared/Leaflet';
import * as Markers from './Markers';
import MapEvents from './MapEvents';

const { GEO_LOCATION } = MAP;

function withLeaflet(Component) {
  const upXSWidth = json2mq({ screen: true, minWidth: SIZES.DEVICES.xs });
  const upXSHeight = json2mq({ screen: true, minHeight: SIZES.DEVICES.s });
  const DEFAULT_HEIGHT = SIZES.MAP_HEIGHT.large;
  const _mqHeights = [SIZES.MAP_HEIGHT.small, DEFAULT_HEIGHT];

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
        `Not enough heights: ${mqHeights.length}! I will populate rest with default value: ${DEFAULT_HEIGHT}.`,
      );
      return 'less';
    }
  };

  const DoctorsMap = ({
    doctors,
    mqHeights = [..._mqHeights],
    center = GEO_LOCATION.SL_CENTER,
    zoom = MAP.ZOOM,
    minZoom = MAP.MIN_ZOOM,
    maxZoom = MAP.MAX_ZOOM,
    ...other
  }) => {
    const isUpXS = useMediaQuery(upXSWidth);
    const isUpXSHeight = useMediaQuery(upXSHeight);

    const Heights = {
      ok: () => mqHeights,
      more: () => mqHeights.slice(0, _mqHeights.length),
      less: () => {
        const currentLength = mqHeights.length;
        const wantedLength = _mqHeights.length;
        const missingValues = Array.from(
          { length: wantedLength - currentLength },
          () => DEFAULT_HEIGHT,
        );
        return [...mqHeights, ...missingValues];
      },
    };

    const getHeights = Heights[validateMqHeights(mqHeights)];
    const [xs, xl] = getHeights();

    const mapHeight = isUpXS && isUpXSHeight ? xl : xs;
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
        <MapEvents />
      </Component>
    );
  };

  return DoctorsMap;
}

export default withLeaflet(Leaflet);
