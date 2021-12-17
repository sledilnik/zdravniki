import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import slugify from 'slugify';
import Box from '@mui/material/Box';

import DoctorCard from 'components/DoctorCard';
import { Loader } from 'components/Shared';

import { leafletContext } from 'context';
import { useDoctors } from 'context/doctorsContext';
import FooterInfoCard from '../components/Shared/FooterInfo';

const Doctor = function Doctor({ isReportError = false }) {
  const { doctors } = useDoctors();
  const { lng, name } = useParams();
  const [doctor, setDoctor] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDoctor(doctors?.all.find(d => slugify(d.name.toLowerCase()) === name));
  }, [doctors, doctor, lng, name]);

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
          flexDirection: 'column',
          alignItems: 'center',
          width: 'calc(100% - 48px)',
          margin: '24px',
          height: { md: 'calc(100vh - 64px)' },
        }}
      >
        <leafletContext.LeafletProvider>
          <DoctorCard doctor={doctor} isPage isReportError={isReportError} />
          <FooterInfoCard isDrPage />
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
