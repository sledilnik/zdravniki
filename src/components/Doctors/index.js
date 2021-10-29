import { useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import InfiniteScroll from 'react-infinite-scroll-component';

import { filterContext } from 'context';
import MainMap from './Map';
import DoctorCard from 'components/DoctorCard';
import { useLeafletContext } from 'context/leafletContext';
import { GEO_LOCATION } from 'constants/index';
import { Button } from '@mui/material';

const StyledWrapper = styled('div')(({ theme }) => ({
  scrollBehavior: 'smooth',
}));

const Doctors = ({ itemsPerPage = 10 }) => {
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

  return (
    <StyledWrapper>
      <MainMap whenCreated={setMap} doctors={doctors} />
      {ids.length === 1 && <Button onClick={handleShowAll}>Pokaži vse</Button>}
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
