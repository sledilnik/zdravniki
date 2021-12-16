import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import slugify from 'slugify';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';

import DoctorCard from 'components/DoctorCard';
import { Loader } from 'components/Shared';

import { leafletContext } from 'context';
import { useDoctors } from 'context/doctorsContext';

import * as SEO from 'components/SEO';

const TypeTranslate = {
  gp: 'generalPractitioner',
  den: 'dentist',
  gyn: 'gynecologist',
};

export const AgeGroupTranslate = {
  a: 'adults',
  y: 'youth',
  s: 'students',
};

const Doctor = function Doctor() {
  const { doctors } = useDoctors();
  const { priimekIme } = useParams();
  const [doctor, setDoctor] = useState();
  const [loading, setLoading] = useState(true);
  const lng = localStorage.getItem('i18nextLng') || 'sl';
  const { t } = useTranslation();

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

  const [doctorType, ageGroup = 'a'] = doctor?.name?.split('-') || [];
  const jobTitle = `${t(TypeTranslate[doctorType])} - ${t(AgeGroupTranslate[ageGroup])}`;

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    name: doctor?.name,
    jobTitle,
    address: {
      '@type': 'Text',
      address: doctor?.fullAddress,
    },
  };

  if (doctor) {
    return (
      <>
        <SEO.Dynamic title={doctor?.name} lang={lng} />
        <SEO.LdJson json={jsonLd} />
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
      </>
    );
  }
  if (loading) {
    return <Loader.Center />;
  }
  return <Navigate to={`/${lng}/404`} />;
};

export default Doctor;
