import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useTheme } from '@mui/material/styles';

import { geoLocation } from '../../constants';
import Leaflet, { Markers } from 'components/Shared/Leaflet';

export const UserMarker = () => {
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

const DoctorMarker = ({ doctor }) => {
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

function withLeaflet(Component) {
  const DoctorMap = props => {
    const { doctors, center = geoLocation.SL_CENTER, height = '500px', ...other } = props;

    const markers = doctors?.map(doctor => <DoctorMarker key={doctor.id} doctor={doctor} />);

    const injectedProps = {
      center,
      height,
      zoom: 8,
      minZoom: 8,
      maxZoom: 16,
      ...other,
    };
    return (
      <Component {...injectedProps}>
        {markers}
        <UserMarker />
      </Component>
    );
  };

  return DoctorMap;
}

export default withLeaflet(Leaflet);
