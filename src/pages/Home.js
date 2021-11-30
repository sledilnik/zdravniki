import Filters from 'components/Filters';
import Doctors from 'components/Doctors';
import { Loader } from 'components/Shared';
import * as Styled from './styles/Home';

import { doctorsContext, leafletContext } from 'context';

import { DOCTORS } from 'const';
import { useEffect } from 'react';

export default function Home() {
  const { isFetching, errors } = doctorsContext.useDoctors();
  const hasError = errors.some(error => error instanceof Error);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style = null;
    };
  }, []);

  if (hasError) {
    return <div>Nekaj je narobe!</div>;
  }

  return (
    <Styled.Main id="main-content">
      {isFetching && !hasError ? (
        <Loader.Center />
      ) : (
        <>
          <Filters />
          <Styled.Box>
            <leafletContext.LeafletProvider>
              <Doctors itemsPerPage={DOCTORS.PER_PAGE} />
            </leafletContext.LeafletProvider>
          </Styled.Box>
        </>
      )}
    </Styled.Main>
  );
}
