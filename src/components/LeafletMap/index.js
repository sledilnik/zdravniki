import { useGeoLocation } from 'hooks';
import { MapContainer, TileLayer, CircleMarker, Marker, Tooltip, useMap } from 'react-leaflet';
import { geoLocation } from '../../constants';

const LeafletMap = ({ doctors, height = '500px', center = geoLocation.SL_CENTER, zoom = 8 }) => {
  const {
    isLoading,
    error,
    data: { latitude: userLat, longitude: userLon },
  } = useGeoLocation(geoLocation.GET_CURRENT_POSITION_OPTIONS);

  const showUserMarker = !isLoading && !error && userLat && userLon;
  const userMarker = showUserMarker && (
    <Marker position={[userLat, userLon]}>
      <Tooltip>some tooltip</Tooltip>
    </Marker>
  );

  const markers = doctors?.map(doctor => {
    return (
      <CircleMarker
        key={doctor.id}
        center={Object.values(doctor.geoLocation)}
        radius={8}
        stroke={false}
        fillOpacity={1}
      >
        <Tooltip>some tooltip</Tooltip>
      </CircleMarker>
    );
  });

  return (
    <MapContainer style={{ height }} center={center} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
      {userMarker}
    </MapContainer>
  );
};

export default LeafletMap;
