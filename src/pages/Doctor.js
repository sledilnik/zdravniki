import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import DoctorCard from 'components/DoctorCard';
import { Loader } from 'components/Shared';

import { leafletContext } from 'context';
import { useDoctors } from 'context/doctorsContext';
import FooterInfoCard from '../components/Shared/FooterInfo';

import * as Styled from './styles/Doctor';

const Doctor = function Doctor() {
  const { doctors } = useDoctors();
  const { lng, type, name, instId } = useParams();
  const [doctor, setDoctor] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDoctor(doctors?.findByTypeAndNameSlug(type, name, instId));
  }, [doctors, doctor, lng, type, name, instId]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  if (!instId) {
    return (
      <Styled.Main id="main-content" component="main">
        <div style={{ maxWidth: '500px', display: 'grid', placeItems: 'center' }}>
          <h2>Napaka</h2>
          <p>
            Se opravičujemo. Za tega zdravnika ne poznamo njegovo institucije zato ne moremo
            prikazati njegovih podatkov.
          </p>
          <p>
            Ta zdravnik se ne nahaja v našem zajemu podatku. 
            Prosimo preverite ali se zdravnik nahaja v bazi ZZZS, saj je ta baza osnova za naš zajem podatkov. 
            V primeru, da je tam zdravnik prisoten počakajte nekaj dni, da se spremembe prikažejo pri nas. 
            V nasprotnem primeru prosimo kontaktirajte zdravniki@sledilnik.org. 
            Hvala!
          </p>
        </div>
        <FooterInfoCard isDrPage />
      </Styled.Main>
    );
  }

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
  if (loading) {
    return <Loader.Center component="main" />;
  }
  return <Navigate to={`/${lng}/404`} />;
};

export default Doctor;
