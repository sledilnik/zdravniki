import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { filterContext } from 'context';
import DoctorCard from 'components/DoctorCard';
import { useLeafletContext } from 'context/leafletContext';
import { MAP } from 'const';
import L from 'leaflet';
import * as Styled from './styles';
import { MainScrollTop } from '../Shared/ScrollTop';
import MainMap from './Map';
import FooterInfoCard from '../Shared/FooterInfo';

const { GEO_LOCATION, BOUNDS } = MAP;

const corner1 = L.latLng(...Object.values(BOUNDS.southWest));
const corner2 = L.latLng(...Object.values(BOUNDS.northEast));
const bounds = L.latLngBounds(corner1, corner2);

const Doctors = function Doctors({ itemsPerPage = 10, useShow }) {
  const { state } = useLocation();
  const { doctors, doctorType, accept, searchValue } = filterContext.useFilter();
  const [show, setShow] = useShow();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [showMap, setShowMap] = useState(matches ? true : show === 'map');
  const [showCards, setShowCards] = useState(matches ? true : show === 'cards');
  const { map, setMap } = useLeafletContext();
  const [items, setItems] = useState(Array.from({ length: itemsPerPage }));

  const doctorsPagination = useMemo(() => doctors?.slice(0, items.length), [doctors, items.length]);

  const fetchMore = () => {
    setItems(items.concat(Array.from({ length: itemsPerPage })));
  };

  useEffect(() => {
    if (matches) {
      setShowMap(true);
      setShowCards(true);
    }
    if (!matches) {
      setShowMap(show === 'map');
      setShowCards(show === 'cards');
    }
  }, [matches, show, setShow]);

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
    window.scrollTo(0, 0);
    const { lat, lon } = geoLocation;
    map.setView([lat, lon]);
    map.flyTo([lat, lon], MAP.MAX_ZOOM);
  };

  const zoom = state?.zoom ?? MAP.ZOOM;
  const center = state?.center ?? MAP.GEO_LOCATION.SL_CENTER;

  return (
    <Styled.Wrapper>
      {showMap && <MainMap whenCreated={setMap} doctors={doctors} center={center} zoom={zoom} />}
      {showCards && (
        <Styled.WrapperInfinite id="scrollableDiv">
          <Styled.InfiniteScroll
            id="infiniteScroll"
            dataLength={doctorsPagination?.length ?? 0}
            next={fetchMore}
            hasMore={doctorsPagination?.length < doctors?.length}
            scrollableTarget="scrollableDiv"
          >
            {doctorsPagination?.map(doctor => (
              <DoctorCard
                key={doctor.key}
                doctor={doctor}
                handleRoomIconClick={event => handleFlyToDoctor(event, doctor)}
              />
            ))}
          </Styled.InfiniteScroll>
          <FooterInfoCard />
          <MainScrollTop />
        </Styled.WrapperInfinite>
      )}
    </Styled.Wrapper>
  );
};

export default Doctors;

export function getCenter(doctors) {
  const isArray = Array.isArray(doctors);
  if (!isArray) return [GEO_LOCATION.SL_CENTER];

  const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const avgLatitude = average(doctors.map(doctor => doctor.geoLocation.lat));
  const avgLongitude = average(doctors.map(doctor => doctor.geoLocation.lon));
  return [avgLatitude, avgLongitude];
}
