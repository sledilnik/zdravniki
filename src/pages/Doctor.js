import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DoctorCard from 'components/DoctorCard';
import { Loader } from 'components/Shared';

import { leafletContext } from 'context';
import { useDoctors } from 'context/doctorsContext';
import FooterInfoCard from '../components/Shared/FooterInfo';

import * as Styled from './styles/Doctor';

const Doctor = function Doctor() {
  const { doctors } = useDoctors();
  const { type, name, instId } = useParams();
  const {
    i18n: { language },
  } = useTranslation();
  const [doctor, setDoctor] = useState();
  const [doctorFound, setDoctorFound] = useState(true);

  useEffect(() => {
    const dr = doctors?.findByTypeAndNameSlug(type, name, instId);
    if (dr) {
      setDoctor(dr);
    } else {
      setDoctorFound(false);
    }
  }, [doctors, doctor, type, name, instId]);

  if (doctor) {
    return (
      <Styled.Main id="main-content" component="main">
        <leafletContext.LeafletProvider>
          <DoctorCard doctor={doctor} isPage />
          <FooterInfoCard isDrPage />
        </leafletContext.LeafletProvider>
      </Styled.Main>
    );
  }

  if (!doctorFound) {
    return <Navigate to={`/${language}/404`} />;
  }

  return <Loader.Center component="main" />;
};

export default Doctor;
