import { memo } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { useLeafletContext } from 'context/leafletContext';
import DoctorMap from './Map';
import * as Styled from './styles';
import Info from './Info';
import PageInfo from './PageInfo';
import { withErrorBoundary } from '../Shared/ErrorBoundary';

const DoctorCard = function DoctorCard({
  doctor,
  isPage = false,
  handleRoomIconClick,
  isReportError,
}) {
  const accepts = doctor.accepts === 'y';
  const { map, setMap } = useLeafletContext();

  const handleZoom = () => {
    const { lat, lon } = doctor.geoLocation;
    map.flyTo([lat, lon], 13);
  };

  const id = `${doctor.type}#${doctor.nameSlug}`;

  if (isPage) {
    return (
      <Styled.PageInfoCard id={id} accepts={accepts.toString()}>
        <Styled.PageInfoBox id="doctor-box">
          <PageInfo doctor={doctor} handleZoom={handleZoom} isReportError={isReportError} />
          <CardContent>
            <CardMedia component="div">
              <DoctorMap doctor={doctor} whenCreated={setMap} handleRoomIconClick={handleZoom} />
            </CardMedia>
          </CardContent>
        </Styled.PageInfoBox>
      </Styled.PageInfoCard>
    );
  }

  return (
    <Styled.InfoCard id={id} accepts={accepts.toString()}>
      <Info doctor={doctor} handleZoom={handleRoomIconClick} />
    </Styled.InfoCard>
  );
};

const propsAreEqual = (prevProps, nextProps) => prevProps.doctor.key === nextProps.doctor.key;
export default memo(withErrorBoundary(DoctorCard), propsAreEqual);
