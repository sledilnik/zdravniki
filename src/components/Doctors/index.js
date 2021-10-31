import { useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import InfiniteScroll from 'react-infinite-scroll-component';
import json2mq from 'json2mq';

import { filterContext } from 'context';
import MainMap from './Map';
import DoctorCard from 'components/DoctorCard';
import { useLeafletContext } from 'context/leafletContext';
import { GEO_LOCATION } from 'constants/index';
import Button from '@mui/material/Button';

const StyledWrapper = styled('div')(({ theme }) => ({
  scrollBehavior: 'smooth',
}));

const ButtonWrapper = styled('div')(({ theme }) => ({
  marginTop: '1rem',
  width: '100%',
  textAlign: 'center',
}));

const Doctors = ({ itemsPerPage = 10 }) => {
  // ? not sure what to do with landscape small mobile
  const upXS = json2mq({ screen: true, minWidth: 350 });
  const isUpXS = useMediaQuery(upXS);
  const mapHeight = isUpXS ? '500px' : '300px';

  const { doctors, doctorType, accept, searchValue, ids, setIds } = filterContext.useFilter();
  const { map, setMap } = useLeafletContext();
  const [items, setItems] = useState(Array.from({ length: itemsPerPage }));

  const _doctors = useMemo(() => doctors?.slice(0, items.length), [doctors, items.length]);

  const fetchMore = () => {
    setItems(items.concat(Array.from({ length: itemsPerPage })));
  };

  useEffect(() => {
    setItems(Array.from({ length: 20 }));
  }, [doctorType, accept, searchValue]);

  const handleFlyToDoctor = (event, { geoLocation, id }) => {
    if (!geoLocation) {
      console.warn('No geo location!');
      return;
    }
    window.scrollTo(0, 0);
    setIds([id]);
    const { lat, lon } = geoLocation;
    map.setView([lat, lon]);
    map.flyTo([lat, lon], 16);
  };

  const handleShowAll = () => {
    map.flyTo(GEO_LOCATION.SL_CENTER, 8);
    setIds([]);
  };

  /**
   * use mapHeight as key on MainMap to force re - render
   * Not sure why it didn't re-render on prop change
   */

  return (
    <StyledWrapper>
      <MainMap key={mapHeight} whenCreated={setMap} doctors={doctors} height={mapHeight} />
      {ids.length === 1 && (
        <ButtonWrapper>
          <Button onClick={handleShowAll}>Pokaži vse</Button>
        </ButtonWrapper>
      )}
      <InfiniteScroll
        dataLength={_doctors?.length ?? 0}
        next={fetchMore}
        hasMore={_doctors?.length < doctors?.length}
        loader={<div>Loading</div>}
        style={{
          marginTop: '1rem',
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
      >
        {_doctors?.map(doctor => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            handleRoomIconClick={event => handleFlyToDoctor(event, doctor)}
          />
        ))}
      </InfiniteScroll>
    </StyledWrapper>
  );
};

export default Doctors;

export function getCenter(doctors) {
  const isArray = Array.isArray(doctors);
  if (!isArray) return [GEO_LOCATION.SL_CENTER];

  const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const avgLatitude = average(doctors.map(doctor => doctor.geoLocation.lat));
  const avgLongitude = average(doctors.map(doctor => doctor.geoLocation.lon));
  return [avgLatitude, avgLongitude];
}
