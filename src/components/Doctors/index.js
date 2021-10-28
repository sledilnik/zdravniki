import { useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';

import { filterContext } from 'context';
import { Grid, Pagination, Loader } from 'components/Shared';
import MainMap from './Map';
import DoctorCard from 'components/DoctorCard';
import { useLeafletContext } from 'context/leafletContext';
import { GEO_LOCATION } from 'constants/index';

const StyledWrapper = styled('div')(({ theme }) => ({
  scrollBehavior: 'smooth',
}));

const Doctors = ({ itemsPerPage = 10 }) => {
  const { doctors, doctorType, accept, searchValue } = filterContext.useFilter();
  const [page, setPage] = useState(1);
  const { map, setMap } = useLeafletContext();

  const pageCount = doctors?.length && Math.floor(doctors.length / itemsPerPage);

  const pageDoctors = useMemo(
    () => doctors?.slice(itemsPerPage * page - itemsPerPage, itemsPerPage * page),
    [doctors, itemsPerPage, page],
  );

  useEffect(() => {
    pageDoctors?.length > 0 && map?.flyTo(getCenter(pageDoctors), 8);
  }, [map, pageDoctors]);

  useEffect(() => {
    setPage(1);
  }, [doctorType, accept, searchValue]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleFlyToDoctor = (event, geoLocation) => {
    if (!geoLocation) {
      console.warn('No geo location!');
      return;
    }
    window.scrollTo(0, 0);
    const { lat, lon } = geoLocation;
    map.flyTo([lat, lon], 16);
  };

  const doctorCards = pageDoctors?.map(doctor => (
    <DoctorCard
      key={doctor.id}
      doctor={doctor}
      handleRoomIconClick={event => handleFlyToDoctor(event, doctor.geoLocation)}
    />
  ));

  return (
    <StyledWrapper>
      <MainMap whenCreated={setMap} doctors={pageDoctors} />
      {doctorCards ? (
        <Grid.Doctors>
          {pageCount !== 0 && (
            <Pagination.DoctorsSmall
              count={pageCount}
              page={page}
              onChange={handleChange}
              showFirstButton
              showLastButton
            />
          )}
          <Grid.Cards>{doctorCards}</Grid.Cards>
          {pageCount !== 0 && (
            <Pagination.DoctorsSmall
              count={pageCount}
              page={page}
              onChange={handleChange}
              showFirstButton
              showLastButton
            />
          )}
        </Grid.Doctors>
      ) : (
        <Grid.Loader>
          <Loader.Center />
        </Grid.Loader>
      )}
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
