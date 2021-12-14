import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import slugify from 'slugify';
import Box from '@mui/material/Box';

import DoctorCard from 'components/DoctorCard';
import { Loader } from 'components/Shared';

import { leafletContext } from 'context';
import { useDoctors } from 'context/doctorsContext';

const Doctor = function Doctor() {
  const { doctors } = useDoctors();
  const { priimekIme } = useParams();
  const [doctor, setDoctor] = useState();
  const [loading, setLoading] = useState(true);
  const lng = localStorage.getItem('i18nextLng') || 'sl';

  useEffect(() => {
    setDoctor(doctors?.all.find(d => slugify(d.name.toLowerCase()) === priimekIme));
  }, [doctors, doctor, lng, priimekIme]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  if (doctor) {
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
        <leafletContext.LeafletProvider>
          <DoctorCard doctor={doctor} isPage />
        </leafletContext.LeafletProvider>
      </Box>
    );
  }
  if (loading) {
    return <Loader.Center />;
  }
  return <Navigate to={`/${lng}/404`} />;
};

export default Doctor;
