import { useEffect, useState, createRef, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useMap } from 'react-leaflet';
import { useTheme } from '@mui/material/styles';

import { Markers } from 'components/Shared/Leaflet';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import { t } from 'i18next';
import { Chip } from '../Shared';

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
  const accepts = doctor.accepts === 'y';
  const { lng } = useParams();

  return (
    <div style={{ maxWidth: '180px' }}>
      <Typography variant="subtitle2">{doctor.name}</Typography>
      <Typography variant="caption">{doctor.provider}</Typography>
      <Stack sx={{ alignItems: 'start', marginTop: '0.5em' }} spacing={1}>
        <Chip.Info text={doctor.getTypeText(lng)} />
        <Chip.Accepts text={doctor.getAcceptText()} accept={accepts} />
      </Stack>
    </div>
  );
};

const areEqual = (prevProps, nextProps) => prevProps.doctor.key === nextProps.doctor.key;
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
