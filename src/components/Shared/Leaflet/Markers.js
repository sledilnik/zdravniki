import { forwardRef } from 'react';
import { CircleMarker, Marker, Popup, Tooltip } from 'react-leaflet';
import { MAP } from 'const';

const { GEO_LOCATION } = MAP;

export const LeafletMarker = function LeafletMarker({ position = [], tooltip, ...other }) {
  return (
    <Marker position={position} {...other}>
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
    </Marker>
  );
};

export const LeafletCircleMarker = forwardRef(
  (
    {
      markerProps = { center: GEO_LOCATION.SL_CENTER, radius: 12, stroke: false, fillOpacity: 0.4 },
      popup,
      ...other
    },
    ref,
  ) => (
    <CircleMarker {...markerProps} {...other}>
      <Popup ref={ref}>{popup}</Popup>
    </CircleMarker>
  ),
);
