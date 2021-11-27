import { useParams } from "react-router-dom";
import { useFilter } from 'context/filterContext';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import { t } from "i18next";
import DoctorCard from "components/DoctorCard";

export default function Doctor() {
  const { allDoctors } = useFilter();
  const { priimekIme } = useParams();
  const [doctor, setDoctor] = useState({});
  const [position, setPosition] = useState([]);
  const init = useRef();

  useEffect(() => {
    allDoctors?.find(doctor => {
      if (doctor.name.toLowerCase() === priimekIme.replaceAll('-', ' ')) {
        setDoctor(doctor);
        setPosition(doctor.geoLocation);
      }
      return null;
    });
  }, [init, allDoctors, priimekIme]);

  const mapProps = {
    center: position,
    height: '200px',
    zoom: 13,
    dragging: false,
    zoomControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: false
  };

  const markerProps = {
    position: position,
    radius: 12,
    stroke: false,
    fillOpacity: 0.4
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto'}}>
      <main>
        {position.length !== 0 ?
          <MapContainer {...mapProps}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker {...markerProps}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          :
          <>{t('loading')}</>}
      </main>
      {doctor ?
        <div style={{ marginTop: '1rem' }}>
          <DoctorCard doctor={doctor} />
        </div>
        : t('loading')}
    </div>
  )

}