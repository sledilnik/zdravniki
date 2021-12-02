import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import DoctorCard from 'components/DoctorCard';
import { Loader } from 'components/Shared';

import { useFilter } from 'context/filterContext';
import { leafletContext } from 'context';

export default function Doctor() {
  const { allDoctors } = useFilter();
  const { priimekIme } = useParams();
  const [doctor, setDoctor] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const _doctor = allDoctors?.find(
      doctor => doctor.name.toLowerCase() === priimekIme.replaceAll('-', ' '),
    );

    allDoctors && _doctor && setDoctor(_doctor);

    if (allDoctors && !_doctor) {
      navigate('/');
    }
    return null;
  }, [allDoctors, priimekIme, navigate]);

  return (
    <Box
      id="main-content"
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: { md: 'calc(100vh - 64px)' },
      }}
    >
      {doctor ? (
        <leafletContext.LeafletProvider>
          <DoctorCard doctor={doctor} isPage />
        </leafletContext.LeafletProvider>
      ) : (
        <Loader.Center />
      )}
    </Box>
  );
}
