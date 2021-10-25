import { useGeoLocation } from 'hooks';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Marker,
  Tooltip,
  useMap,
  Popup,
} from 'react-leaflet';
import { geoLocation } from '../../constants';

export const SetCenter = ({ center = geoLocation.SL_CENTER }) => {
  const map = useMap();

  if (!center || center.some(val => isNaN(val))) return null;
  map.setView(center);
  return null;
};

export const FlyTo = ({ position = geoLocation.SL_CENTER, zoom = 8 }) => {
  const map = useMap();

  if (!position || position.some(val => isNaN(val))) return null;
  map.flyTo(position, zoom);
  return null;
};

export const SetZoom = ({ zoom = 8 }) => {
  const map = useMap();

  !isNaN(zoom) && map.setZoom(zoom);
  return null;
};

const LeafletMap = ({
  doctors,
  height = '500px',
  center = geoLocation.SL_CENTER,
  zoom = 8,
  children,
}) => {
  const {
    isLoading,
    error,
    data: { latitude: userLat, longitude: userLon },
  } = useGeoLocation(geoLocation.GET_CURRENT_POSITION_OPTIONS);

  const showUserMarker = !isLoading && !error && userLat && userLon;
  const userMarker = showUserMarker && (
    <Marker position={[userLat, userLon]}>
      <Tooltip>Ti</Tooltip>
    </Marker>
  );

  const markers = doctors?.map(doctor => {
    const fillColor = doctor.accept ? 'green' : 'red';
    return (
      <CircleMarker
        key={doctor.id}
        center={doctor.geoLocation}
        radius={12}
        stroke={false}
        fillOpacity={0.4}
        fillColor={fillColor}
      >
        <Popup>{doctor.name}</Popup>
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
      <SetZoom zoom={8} />
      <SetCenter center={getCenter(doctors)} />
      <FlyTo position={getCenter(doctors)} />
      {children}
    </MapContainer>
  );
};

export default LeafletMap;

export function getCenter(doctors) {
  const isArray = Array.isArray(doctors);
  if (!isArray) return null;

  const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const avgLatitude = average(doctors.map(doctor => doctor.geoLocation.lat));
  const avgLongitude = average(doctors.map(doctor => doctor.geoLocation.lon));
  return [avgLatitude, avgLongitude];
}

// function getGroupsByLocation(doctors) {
//   const isArray = Array.isArray(doctors);
//   if (!isArray) return null;

//   const unicAddresses = [...new Set(doctors.map(doctor => doctor.fullAddress))];
//   return unicAddresses.reduce((acc, fullAddress) => {
//     const filteredDoctors = doctors.filter(doctor => doctor.fullAddress === fullAddress);

//     acc[fullAddress] = {
//       doctors: filteredDoctors,
//       count: filteredDoctors.length,
//       geoLocation: filteredDoctors?.[0].geoLocation,
//       address: fullAddress,
//     };
//     return acc;
//   }, {});
// }
