import { useEffect, useState, createRef } from 'react';
import { useMap } from 'react-leaflet';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { Markers } from 'components/Shared/Leaflet';
import Typography from '@mui/material/Typography';
import { filterContext } from 'context';
import { useLeafletContext } from 'context/leafletContext';

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

const PopUpData = ({ doctor, popUpRef }) => {
  const { setIds } = filterContext.useFilter();
  const { map } = useLeafletContext();

  const goToHandlers = () => {
    popUpRef.current.togglePopup();
    setIds([doctor.id]);

    const {
      geoLocation: { lat, lon },
    } = doctor;

    map.flyTo([lat, lon], 16);
  };

  return (
    <>
      <Typography variant="subtitle2">{doctor.name}</Typography>
      <Typography variant="subtitle2">{doctor.activity}</Typography>
      <Typography variant="subtitle2">{doctor.provider}</Typography>
      <Button onClick={goToHandlers}>Pojdi</Button>
    </>
  );
};

export const Doctor = ({ doctor }) => {
  const ref = createRef(null);
  const theme = useTheme();
  const { palette } = theme;
  const fillColor = doctor.accept ? palette.success.main : palette.error.main;
  return (
    <Markers.LeafletCircleMarker
      ref={ref}
      center={doctor.geoLocation}
      radius={12}
      stroke={false}
      fillOpacity={0.7}
      fillColor={fillColor}
      popup={<PopUpData doctor={doctor} popUpRef={ref} />}
    />
  );
};
