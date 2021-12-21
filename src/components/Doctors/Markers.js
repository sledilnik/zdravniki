import { useEffect, useState, createRef, memo } from 'react';
import { useMap } from 'react-leaflet';
import { useTheme } from '@mui/material/styles';

import { Markers } from 'components/Shared/Leaflet';
import { t } from 'i18next';
import * as Styled from './styles';
import Info from '../DoctorCard/Info';

export const User = function User() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', e => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return position && <Markers.LeafletMarker position={position} tooltip={t('yourLocation')} />;
};

const PopUpData = function PopUpData({ doctor }) {
  return (
    <Styled.InfoCard>
      <Info doctor={doctor} isMarker />
    </Styled.InfoCard>
  );
};

const areEqual = (prevProps, nextProps) => prevProps.doctor.id === nextProps.doctor.id;
export const Doctor = memo(({ doctor }) => {
  const ref = createRef(null);
  const theme = useTheme();
  const { palette } = theme;
  const fillColor = doctor.accepts === 'y' ? palette.success.main : palette.error.main;
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
}, areEqual);
