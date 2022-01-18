import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import L from 'leaflet';

import { Alert } from '@mui/material';

import PropTypes from 'prop-types';
import { MAP } from 'const';

import { useDoctorTypeExactPath } from 'hooks';
import { filterContext } from 'context';
import { useLeafletContext } from 'context/leafletContext';

import { reduceHash } from 'utils';
import DoctorCard from 'components/DoctorCard';
import MainMap from './Map';
import { MainScrollTop } from '../Shared/ScrollTop';
import FooterInfoCard from '../Shared/FooterInfo';
import { CardsList } from '../Shared/Loader';
import MapOnlySnackbar from './MapOnlySnackbar';

import * as Styled from './styles';
import { withErrorBoundary } from '../Shared/ErrorBoundary';

const { BOUNDS } = MAP;

const corner1 = L.latLng(...Object.values(BOUNDS.southWest));
const corner2 = L.latLng(...Object.values(BOUNDS.northEast));
const bounds = L.latLngBounds(corner1, corner2);

const Doctors = function Doctors({ itemsPerPage = 10, useShow }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { hash: currentHash } = useLocation();
  const { doctors, doctorType, accept, searchValue } = filterContext.useFilter();
  const [show, setShow] = useShow();
  const { map, setMap } = useLeafletContext();
  const [items, setItems] = useState(Array.from({ length: itemsPerPage }));
  const { zoom: zoomFromPath, loc: locFromPath } = useDoctorTypeExactPath();
  const navigate = useNavigate();

  const doctorsPagination = useMemo(() => doctors?.slice(0, items.length), [doctors, items.length]);

  const fetchMore = () => {
    setItems(items.concat(Array.from({ length: itemsPerPage })));
  };

  useEffect(() => {
    map?.setMaxBounds(bounds);
  }, [map]);

  useEffect(() => {
    setItems(Array.from({ length: 20 }));
  }, [doctorType, accept, searchValue]);

  const handleFlyToDoctor = (event, { geoLocation }) => {
    if (!geoLocation) {
      return;
    }
    setShow('map');
    window.scrollTo(0, 0);
    const { lat, lon } = geoLocation;
    map.setView([lat, lon]);
    map.flyTo([lat, lon], MAP.MAX_ZOOM);
  };

  const zoom = zoomFromPath ?? MAP.ZOOM;
  const center = locFromPath ?? MAP.GEO_LOCATION.SL_CENTER;

  const areDoctors = Array.isArray(doctors) && doctors.length !== 0;
  const dataLoading = !Array.isArray(doctors);
  const noResults = !areDoctors && !dataLoading;

  useEffect(() => {
    if (map) {
      const newHash = currentHash.replace('#', '').split('|').reduce(reduceHash, {
        search: '',
        loc: MAP.GEO_LOCATION.SL_CENTER,
        zoom: MAP.ZOOM,
        accepts: 'vsi',
      });

      map.setZoom(newHash.zoom);
      map.setView(newHash.loc);

      const hash = `a-${newHash.accepts}|l-${newHash.zoom}/${newHash.loc.join('/')}|s-`;

      navigate(`../${language}/${doctorType}/#${hash}`);
    }
  }, [doctorType, navigate, map, currentHash, language]);

  useEffect(() => {
    if (map) {
      const z = map?.getZoom();
      const c = map?.getCenter();

      const loc = [z, c.lat, c.lng].join('/');

      navigate(`./#a-${accept}|l-${loc}|s-${searchValue}`);
    }
  }, [searchValue, accept, navigate, map]);

  return (
    <Styled.Wrapper show={show}>
      <MapOnlySnackbar noResults={show === 'map' && noResults} />
      <MainMap className="map" whenCreated={setMap} doctors={doctors} center={center} zoom={zoom} />
      <Styled.WrapperInfinite id="scrollableDiv" className="cards">
        {noResults && <Alert severity="info">{t('noResults')}</Alert>}
        {dataLoading && <CardsList />}
        <Styled.InfiniteScroll
          id="infiniteScroll"
          dataLength={doctorsPagination?.length ?? 0}
          next={fetchMore}
          hasMore={doctorsPagination?.length < doctors?.length}
          scrollableTarget="scrollableDiv"
        >
          {!noResults && !dataLoading && (
            <Styled.TotalResults>
              {t('totalResults', { count: doctors?.length ?? 0 })}
            </Styled.TotalResults>
          )}
          {doctorsPagination?.map(doctor => (
            <DoctorCard
              key={doctor.key}
              doctor={doctor}
              handleRoomIconClick={event => handleFlyToDoctor(event, doctor)}
            />
          ))}
        </Styled.InfiniteScroll>
        {!dataLoading && <FooterInfoCard />}
      </Styled.WrapperInfinite>
      <MainScrollTop />
    </Styled.Wrapper>
  );
};

Doctors.propTypes = {
  itemsPerPage: PropTypes.number,
  useShow: PropTypes.func.isRequired,
};

Doctors.defaultProps = {
  itemsPerPage: 10,
};

export default withErrorBoundary(Doctors);
