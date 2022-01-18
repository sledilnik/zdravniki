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

import DoctorCard from 'components/DoctorCard';
import MainMap from './Map';
import { MainScrollTop } from '../Shared/ScrollTop';
import FooterInfoCard from '../Shared/FooterInfo';
import { CardsList } from '../Shared/Loader';
import MapOnlySnackbar from './MapOnlySnackbar';

import * as Styled from './styles';
import { withErrorBoundary } from '../Shared/ErrorBoundary';

const { GEO_LOCATION, BOUNDS } = MAP;

const corner1 = L.latLng(...Object.values(BOUNDS.southWest));
const corner2 = L.latLng(...Object.values(BOUNDS.northEast));
const bounds = L.latLngBounds(corner1, corner2);

const Doctors = function Doctors({ itemsPerPage = 10, useShow }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { state, hash: currentHash, pathname: currentPathname } = useLocation();
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

  const zoom = state?.zoom ?? zoomFromPath ?? MAP.ZOOM;
  const center = state?.center ?? locFromPath ?? MAP.GEO_LOCATION.SL_CENTER;

  const areDoctors = Array.isArray(doctors) && doctors.length !== 0;
  const dataLoading = !Array.isArray(doctors);
  const noResults = !areDoctors && !dataLoading;

  useEffect(() => {
    const z = map?.getZoom() ?? zoom;
    const c = map?.getCenter() ?? { lat: center[0], lng: center[1] };

    const loc = [z, c.lat, c.lng].join('/');

    navigate(`./#a-${accept}|l-${loc}|s-${searchValue}`);
  }, [searchValue, accept, navigate, map, zoom, center]);

  useEffect(() => {
    if (!currentPathname.includes(doctorType)) {
      navigate(`../${language}/${doctorType}/${currentHash}`);
    }
  }, [doctorType, currentHash, currentPathname, language, navigate]);

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

export function getCenter(doctors) {
  const isArray = Array.isArray(doctors);
  if (!isArray) return [GEO_LOCATION.SL_CENTER];

  const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const avgLatitude = average(doctors.map(doctor => doctor.geoLocation.lat));
  const avgLongitude = average(doctors.map(doctor => doctor.geoLocation.lon));
  return [avgLatitude, avgLongitude];
}
