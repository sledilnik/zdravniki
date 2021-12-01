import { memo } from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import DoctorMap from './Map';
import * as Styled from './styles';
import Info from './Info';
import PageInfo from './PageInfo';

import { useLeafletContext } from 'context/leafletContext';

const DoctorCard = ({ doctor, isPage = false }) => {
  const accepts = doctor.accepts === 'y';
  const { map, setMap } = useLeafletContext();

  const handleZoom = e => {
    const { lat, lon } = doctor.geoLocation;
    map.flyTo([lat, lon], 13);
  };

  if (isPage) {
    return (
      <Styled.PageInfoCard id={doctor.id} accepts={accepts.toString()}>
        <Styled.PageInfoBox id="doctor-box">
          <PageInfo doctor={doctor} handleZoom={handleZoom} />
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
    <Styled.InfoCard id={doctor.id} accepts={accepts.toString()}>
      <Info doctor={doctor} handleZoom={handleZoom} />
    </Styled.InfoCard>
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  return prevProps.doctor.id === nextProps.doctor.id;
};
export default memo(DoctorCard, propsAreEqual);
