import { useNavigate, useParams } from 'react-router-dom';
import { CardContent, Stack, Tooltip, Typography } from '@mui/material';

import { useLeafletContext } from 'context/leafletContext';
import SingleChart from 'components/Shared/CircleChart';

import DoctorActions from './DoctorActions';

import * as Styled from '../styles';
import * as Shared from '../Shared';

import { toPercent } from '../utils';

const Info = function Info({ doctor, handleZoom = () => {}, isMarker = false }) {
  const { lng } = useParams();
  const { map } = useLeafletContext();
  const accepts = doctor.accepts === 'y';
  const availabilityText = toPercent(doctor.availability, lng);
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
            <Tooltip
              title={
                <Shared.Tooltip.HeadQuotient
                  load={doctor.load}
                  note={doctor.note}
                  date={doctor.updatedAt && doctor.formatUpdatedAt(lng)}
                />
              }
              leaveTouchDelay={3000}
              enterTouchDelay={50}
            >
              <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
                <Shared.Accepts accepts={accepts} />
              </Styled.InfoWrapper>
            </Tooltip>
            <Tooltip
              title={
                <Shared.Tooltip.Availability
                  date={doctor.availabilityOverride && doctor.formatUpdatedAt(lng)}
                />
              }
              leaveTouchDelay={3000}
              enterTouchDelay={50}
            >
              <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
                <SingleChart size="26px" percent={doctor.availability} />
                <Stack>
                  <Styled.Availability variant="caption">{availabilityText}</Styled.Availability>
                </Stack>
              </Styled.InfoWrapper>
            </Tooltip>
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
