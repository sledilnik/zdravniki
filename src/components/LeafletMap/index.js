import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';

const LeafletMap = ({ doctors }) => {
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
    <MapContainer
      style={{ height: '500px' }}
      center={[46.16, 14.8276214]}
      zoom={8}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
};

export default LeafletMap;
