import { useParams } from 'react-router-dom';
import { useFilter } from 'context/filterContext';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import DoctorCard from 'components/DoctorCard';
import Box from '@mui/material/Box';
import { leafletContext } from 'context';
import { Loader } from 'components/Shared';

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
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // marginInline: { sm: '0.5em', md: '1em' },
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
