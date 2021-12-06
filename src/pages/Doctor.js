import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import Box from '@mui/material/Box';

import DoctorCard from 'components/DoctorCard';
import { Loader } from 'components/Shared';

import { useFilter } from 'context/filterContext';
import { leafletContext } from 'context';

const Doctor = function Doctor() {
  const { allDoctors } = useFilter();
  const { priimekIme } = useParams();
  const { pathname } = useLocation();
  const [doctor, setDoctor] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const _doctor = allDoctors?.find(d => slugify(d.name.toLowerCase()) === priimekIme);
    const lng = localStorage.getItem('i18nextLng') || 'sl';

    setDoctor(_doctor);

    if (allDoctors && !_doctor) {
      navigate(`${lng}/404`);
    }
    return null;
  }, [allDoctors, priimekIme, navigate, pathname]);

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
