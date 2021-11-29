import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import DoctorCard from 'components/DoctorCard';
import { Loader } from 'components/Shared';

import { useFilter } from 'context/filterContext';
import { leafletContext } from 'context';

export default function Doctor() {
  const { allDoctors } = useFilter();
  const { priimekIme } = useParams();
  const [doctor, setDoctor] = useState();

  useEffect(() => {
    allDoctors?.find(doctor => {
      if (doctor.name.toLowerCase() === priimekIme.replaceAll('-', ' ')) {
        setDoctor(doctor);
      }
      return null;
    });
  }, [allDoctors, priimekIme]);

  return (
    <Box
      id="main-content"
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
