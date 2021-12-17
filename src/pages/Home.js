import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Filters from 'components/Filters';
import Doctors from 'components/Doctors';
import { Loader } from 'components/Shared';
import * as SEO from 'components/SEO';

import { doctorsContext } from 'context';

import { DOCTORS } from 'const';
import { useEffect, useState } from 'react';
import * as Styled from './styles/Home';

const Home = function Home() {
  const { t } = useTranslation();
  const { lng } = useParams();
  const [show, setShow] = useState('map');
  const { isFetching, errors } = doctorsContext.useDoctors();
  const hasError = errors.some(error => error instanceof Error);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style = null;
    };
  }, []);

  if (hasError) {
    return <div>{t('pageNotFound.somethingWentWrong')}</div>;
  }

  const useShow = () => [show, setShow];

  return (
    <>
      <SEO.Dynamic title={t('SEO.title.home')} lang={lng} />
      <Styled.Main id="main-content">
        {isFetching && !hasError ? (
          <Loader.Center />
        ) : (
          <>
            <Filters useShow={useShow} />
            <Styled.Box>
              <Doctors itemsPerPage={DOCTORS.PER_PAGE} useShow={useShow} />
            </Styled.Box>
          </>
        )}
      </Styled.Main>
    </>
  );
};

export default Home;
