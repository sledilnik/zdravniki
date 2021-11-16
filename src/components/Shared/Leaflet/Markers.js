import { forwardRef } from 'react';
import { CircleMarker, Marker, Popup, Tooltip } from 'react-leaflet';
import { MAP } from 'const';

const { GEO_LOCATION } = MAP;

export const LeafletMarker = ({ position = [], tooltip, ...other }) => {
  return (
    <Marker position={position} {...other}>
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
    </Marker>
  );
};

export const LeafletCircleMarker = forwardRef((props, ref) => {
  const Component = ({
    markerProps = { center: GEO_LOCATION.SL_CENTER, radius: 12, stroke: false, fillOpacity: 0.4 },
    popup,
    ...other
  }) => (
    <CircleMarker {...markerProps} {...other}>
      <Popup ref={ref}>{popup}</Popup>
    </CircleMarker>
  );
  return <Component {...props} />;
});
