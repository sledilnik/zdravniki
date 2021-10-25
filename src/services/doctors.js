import { v4 as uuidv4 } from 'uuid';
import { doctors } from '../constants';
const trimString = str => str.replace(/\s+/g, ' ').trim();

function createDoctor({
  id,
  doctorType,
  munUnit,
  provider,
  address,
  fullName,
  activity,
  accept,
  geo_location,
}) {
  const _accept = doctors.AcceptsBool[accept];
  const _acceptText = doctors.AcceptsText[accept];
  const _activity = doctors.Activities[trimString(activity.trim())] ?? activity;
  const _munUnit = trimString(munUnit);
  const _provider = trimString(provider).replace(doctors.Provider.ZD, 'ZD');
  const _name = trimString(fullName);

  const [code, city] = address.city.split(' ');
  const _address = { street: address.street, code, city };
  const _geo_location = Object.entries(geo_location).reduce(
    (acc, [key, str]) => {
      acc[key] = parseFloat(str);
      return acc;
    },
    { lat: null, lon: null },
  );

  return Object.freeze({
    id,
    get type() {
      return doctorType;
    },
    get munUnit() {
      return _munUnit;
    },
    get provider() {
      return _provider;
    },
    get fullAddress() {
      return `${_address.street}, ${_address.code} ${_address.city}`;
    },
    get street() {
      return _address.street;
    },
    get city() {
      return _address.city;
    },
    get postalCode() {
      return _address.code;
    },
    get name() {
      return _name;
    },
    get activity() {
      return _activity;
    },
    get accept() {
      return _accept;
    },
    get acceptText() {
      return _acceptText;
    },
    get geoLocation() {
      return _geo_location;
    },
  });
}

export default function createDoctors(doctors = [], doctorType = 'zdravnik') {
  const result = doctors
    .filter(doctor => doctor[0])
    .map(doctor => {
      const id = uuidv4();
      const [
        munUnit,
        provider,
        street,
        city,
        fullName,
        activity,
        scope,
        quotient,
        accept,
        lat,
        lon,
      ] = doctor;

      const address = { street, city };
      const geo_location = { lat, lon };

      return createDoctor({
        id,
        doctorType,
        munUnit,
        provider,
        address,
        fullName,
        activity,
        scope,
        quotient,
        accept,
        geo_location,
      });
    });

  return result;
}
