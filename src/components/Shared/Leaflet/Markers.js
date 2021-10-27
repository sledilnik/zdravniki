import { CircleMarker, Marker, Popup, Tooltip } from 'react-leaflet';
import { GEO_LOCATION } from '../../../constants';

export const LeafletMarker = ({ position = [], tooltip }) => {
  return <Marker position={position}>{tooltip && <Tooltip>{tooltip}</Tooltip>}</Marker>;
};

export const LeafletCircleMarker = ({
  markerProps = { center: GEO_LOCATION.SL_CENTER, radius: 12, stroke: false, fillOpacity: 0.4 },
  popup,
  ...other
}) => (
  <CircleMarker {...markerProps} {...other}>
    <Popup>{popup}</Popup>
  </CircleMarker>
);
