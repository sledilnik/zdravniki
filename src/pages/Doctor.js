import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';
import Box from '@mui/material/Box';

import DoctorCard from 'components/DoctorCard';
import { Loader } from 'components/Shared';

import { useFilter } from 'context/filterContext';
import { leafletContext } from 'context';

const Doctor = function Doctor() {
  const { allDoctors } = useFilter();
  const { priimekIme } = useParams();
  const [doctor, setDoctor] = useState();

  useEffect(() => {
    allDoctors?.find(aDoctor => {
      if (slugify(aDoctor.name.toLowerCase()) === priimekIme) {
        setDoctor(aDoctor);
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
};

export default Doctor;
