import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useTheme } from '@mui/material/styles';

import { Markers } from 'components/Shared/Leaflet';

export const User = () => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', e => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return position && <Markers.LeafletMarker position={position} tooltip="Tvoja lokacija" />;
};

export const Doctor = ({ doctor }) => {
  const theme = useTheme();
  const { palette } = theme;
  const fillColor = doctor.accept ? palette.success.main : palette.error.main;
  return (
    <Markers.LeafletCircleMarker
      center={doctor.geoLocation}
      radius={12}
      stroke={false}
      fillOpacity={0.4}
      fillColor={fillColor}
      popup={<a href={`#${doctor.id}`}>{doctor.name}</a>}
    />
  );
};
