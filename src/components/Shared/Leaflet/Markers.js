import { CircleMarker, Marker, Popup, Tooltip } from 'react-leaflet';
import { geoLocation } from '../../../constants';

export const LeafletMarker = ({ position = [], tooltip }) => {
  return <Marker position={position}>{tooltip && <Tooltip>{tooltip}</Tooltip>}</Marker>;
};

export const LeafletCircleMarker = ({
  markerProps = { center: geoLocation.SL_CENTER, radius: 12, stroke: false, fillOpacity: 0.4 },
  popup,
  ...other
}) => {
  return (
    <CircleMarker {...markerProps} {...other}>
      <Popup>{popup}</Popup>
    </CircleMarker>
  );
};
