import { useEffect, useMemo, useState } from 'react';

import { filterContext } from 'context';
import MainMap from './Map';
import DoctorCard from 'components/DoctorCard';
import { useLeafletContext } from 'context/leafletContext';
import { MAP } from 'const';
import Button from '@mui/material/Button';
import * as Styled from './styles';

const { GEO_LOCATION } = MAP;

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

  useEffect(() => {
    map?.flyTo(GEO_LOCATION.SL_CENTER, MAP.ZOOM);
  }, [map, doctorType, accept]);

  const handleFlyToDoctor = (event, { geoLocation, id }) => {
    if (!geoLocation) {
      console.warn('No geo location!');
      return;
    }
    window.scrollTo(0, 0);
    setIds([id]);
    const { lat, lon } = geoLocation;
    map.setView([lat, lon]);
    map.flyTo([lat, lon], MAP.MAX_ZOOM);
  };

  const handleShowAll = () => {
    map.flyTo(GEO_LOCATION.SL_CENTER, MAP.ZOOM);
    setIds([]);
  };

  return (
    <Styled.Wrapper>
      <MainMap whenCreated={setMap} doctors={doctors} />
      {ids.length === 1 && (
        <Styled.ButtonWrapper>
          <Button onClick={handleShowAll}>Pokaži vse</Button>
        </Styled.ButtonWrapper>
      )}
      <Styled.WrapperInfinite id="scrollableDiv">
        <Styled.InfiniteScroll
          dataLength={_doctors?.length ?? 0}
          next={fetchMore}
          hasMore={_doctors?.length < doctors?.length}
          loader={<div>Loading</div>}
          scrollableTarget="scrollableDiv"
        >
          {_doctors?.map(doctor => (
            <DoctorCard
              key={doctor.key}
              doctor={doctor}
              handleRoomIconClick={event => handleFlyToDoctor(event, doctor)}
            />
          ))}
        </Styled.InfiniteScroll>
      </Styled.WrapperInfinite>
    </Styled.Wrapper>
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
