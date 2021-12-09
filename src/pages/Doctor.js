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
  const lng = localStorage.getItem('i18nextLng') || 'sl';

  useEffect(() => {
    setDoctor(allDoctors?.find(d => slugify(d.name.toLowerCase()) === priimekIme));
    if (allDoctors && !doctor) {
      navigate(`${lng}/404`);
    }
  }, [allDoctors, doctor, lng, priimekIme, navigate, pathname]);

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
