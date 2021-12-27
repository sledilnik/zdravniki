import { useNavigate, useParams } from 'react-router-dom';
import { CardContent, Stack, Typography } from '@mui/material';

import { useLeafletContext } from 'context/leafletContext';

import DoctorActions from './DoctorActions';

import * as Shared from '../Shared';

const Info = function Info({ doctor, handleZoom = () => {}, isMarker = false }) {
  const { lng } = useParams();
  const { map } = useLeafletContext();
  const [type, ageGroup] = doctor.type.split('-');

  const navigate = useNavigate();

  const drPath = doctor?.type;
  const slug = doctor?.nameSlug;
  const instId = doctor?.instId;

  let path = `/${lng}/${drPath}/${slug}/${instId}`;

  const handleDoctorCard = (event, isReportError) => {
    event.preventDefault();
    if (isReportError) {
      path = `/${lng}/${drPath}/${slug}/${instId}/edit`;
    }
    return navigate(path, {
      state: {
        zoom: map?.getZoom(),
        center: map?.getCenter(),
        type,
        ageGroup: ageGroup ?? 'adults',
      },
    });
  };

  const phoneNum = doctor.phone?.split(',')?.[0];

  return (
    <>
      <CardContent>
        <Typography component="h2" variant="h2">
          <Shared.LinkNoRel href={path} onClick={e => handleDoctorCard(e, false)}>
            {doctor.name}
          </Shared.LinkNoRel>
        </Typography>
        {isMarker && <Shared.DoubleChip type={type} ageGroup={ageGroup} />}
        <Typography component="h3" variant="h3">
          {doctor.provider}
        </Typography>
        <Typography component="address" variant="body2">
          {doctor.fullAddress}
        </Typography>

        <Stack direction={isMarker ? 'column' : 'row'} justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Shared.HeadQuotient
              load={doctor.load}
              note={doctor.note}
              date={doctor.updatedAt && doctor.formatUpdatedAt(lng)}
              accepts={doctor.accepts}
              hasOverride={doctor.acceptsOverride || doctor.note ? true : undefined}
            />
            <Shared.Availability
              availability={doctor.availability}
              date={doctor.updatedAt && doctor.formatUpdatedAt(lng)}
              hasOverride={doctor.availabilityOverride ? true : undefined}
            />
          </Stack>
        </Stack>
      </CardContent>
      <DoctorActions
        menuId={`dr-menu--${drPath}-${slug}`}
        isMarker={isMarker}
        handlers={{ handleZoom, handleDoctorCard }}
        phoneNum={phoneNum}
        path={path}
      />
    </>
  );
};

// todo try React.memo; don't forget about locales
export default Info;
