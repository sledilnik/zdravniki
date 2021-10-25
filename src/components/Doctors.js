import { useEffect, useMemo, useRef, useState } from 'react';
import { filterContext } from 'context';
import { Grid, Pagination, Loader } from './Shared';
import LeafletMap, { FlyTo, getCenter, SetCenter } from './LeafletMap';
import DoctorCard from 'components/DoctorCard';
import { geoLocation } from '../constants';

const Doctors = ({ itemsPerPage = 10 }) => {
  const { doctors } = filterContext.useFilter();
  const [page, setPage] = useState(1);
  const [center, setCenter] = useState(geoLocation.SL_CENTER);
  const zoom = 8;

  const leafletChildren = useRef(null);

  // todo rename count to pageCount
  const count = doctors?.length && Math.floor(doctors.length / itemsPerPage);

  const pageDoctors = useMemo(
    () => doctors?.slice(itemsPerPage * page - itemsPerPage, itemsPerPage * page),
    [doctors, itemsPerPage, page],
  );

  useEffect(() => {
    if (pageDoctors?.length) {
      console.log('Should fly ');
      leafletChildren.current = [
        <FlyTo
          key={center.toString() + Math.random()}
          position={getCenter(pageDoctors)}
          zoom={8}
        />,
        <SetCenter key={pageDoctors.toString()} center={getCenter(pageDoctors)} />,
      ];
    }
  }, [pageDoctors, center]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleFlyToDoctor = (event, geoLocation) => {
    if (!geoLocation) {
      console.warn('No geo location!');
      return;
    }
    window.scrollTo(0, 0);
    setCenter([geoLocation.lat, geoLocation.lon]);
    leafletChildren.current = <FlyTo position={[geoLocation.lat, geoLocation.lon]} zoom={14} />;
  };

  const doctorCards = pageDoctors?.map(doctor => (
    <DoctorCard
      key={doctor.id}
      doctor={doctor}
      handleRoomIconClick={event => handleFlyToDoctor(event, doctor.geoLocation)}
    />
  ));

  return (
    <>
      <LeafletMap
        doctors={pageDoctors}
        center={center}
        zoom={zoom}
        children={leafletChildren.current}
      />
      {doctorCards ? (
        <Grid.Doctors>
          {count !== 0 && (
            <Pagination.DoctorsSmall count={count} page={page} onChange={handleChange} />
          )}
          <Grid.Cards>{doctorCards}</Grid.Cards>
          {count !== 0 && (
            <Pagination.DoctorsSmall count={count} page={page} onChange={handleChange} />
          )}
        </Grid.Doctors>
      ) : (
        <Grid.Loader>
          <Loader />
        </Grid.Loader>
      )}
    </>
  );
};

export default Doctors;
