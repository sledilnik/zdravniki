import { useState } from 'react';
import { filterContext } from 'context';
import { Grid, Pagination, Loader } from './Shared';
import DoctorCard from './DoctorCard';
import LeafletMap from './LeafletMap';

const Doctors = ({ itemsPerPage = 10 }) => {
  const { doctors } = filterContext.useFilter();
  const [page, setPage] = useState(1);

  const count = doctors?.length && Math.floor(doctors.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const pageDoctors = doctors?.slice(itemsPerPage * page - itemsPerPage, itemsPerPage * page);
  const doctorCards = pageDoctors?.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />);
  return (
    <>
      <LeafletMap doctors={pageDoctors} />
      {doctorCards ? (
        <Grid.Doctors>
          <Pagination.DoctorsSmall count={count} page={page} onChange={handleChange} />
          <Grid.Cards>{doctorCards}</Grid.Cards>
          <Pagination.DoctorsSmall count={count} page={page} onChange={handleChange} />
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
