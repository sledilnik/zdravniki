import { t } from 'i18next';
import slugify from 'slugify';

import { DOCTORS } from 'const';

const trimString = str => str.replace(/\s+/g, ' ').trim();

export function createDoctor(doctor, institution) {
  const getAcceptText = () => (doctor.accepts === 'y' ? t('accepts') : t('rejects'));

  const name = trimString(doctor.doctor);
  const nameSlug = slugify(name.toLowerCase());

  const manUnit = trimString(institution.unit);
  const provider = trimString(institution.name);
  const website = trimString(institution.website);
  const phone = trimString(institution.phone);
  const { address, city, municipalityPart, municipality, post } = institution;
  const [_code, _post] = post.split(' ');
  const geoLocation = { lat: parseFloat(institution.lat), lon: parseFloat(institution.lon) };

  const addressObject = {
    street: address,
    postalCode: _code,
    city,
    municipalityPart,
    municipality,
    post: _post,
  };

  const { availability, load } = doctor;

  return Object.freeze({
    get key() {
      return doctor.key;
    },
    get type() {
      return doctor.type;
    },
    get name() {
      return name;
    },
    get nameSlug() {
      return nameSlug;
    },
    get accepts() {
      return doctor.accepts;
    },
    get provider() {
      return provider;
    },
    get website() {
      return website;
    },
    get phone() {
      return phone;
    },
    get munUnit() {
      return manUnit;
    },
    get fullAddress() {
      return `${addressObject.street}, ${addressObject.city}`;
    },
    get searchAddress() {
      return `${addressObject.street}, ${addressObject.postalCode} ${addressObject.city} ${addressObject.municipalityPart} ${addressObject.municipality}`;
    },
    get geoLocation() {
      return geoLocation;
    },
    get availability() {
      return availability;
    },
    get load() {
      return load;
    },
    getAcceptText,
  });
}

export default function createDoctors({ doctorsDict, institutionsDict }) {
  const instKey = DOCTORS.INSTITUTION_KEY;

  const doctors = Object.entries(doctorsDict).reduce((acc, [doctorId, doctorData]) => {
    const doctor = createDoctor(doctorData, institutionsDict[doctorData[instKey]]);
    acc[doctorId] = doctor;
    return acc;
  }, {});

  const doctorValues = Object.values(doctors);
  const doctorsValues = Intl.Collator
    ? doctorValues.sort((a, b) => new Intl.Collator('sl').compare(a.name, b.name))
    : doctorValues.sort((a, b) => a.name.localeCompare(b.name, 'sl'));

  const filterByType = type => doctorsValues.filter(doctor => doctor.type === type);

  const byType = DOCTORS.TYPES.reduce((acc, type) => {
    acc[type] = filterByType(type);
    return acc;
  }, {});

  const filterByTypeAndAccepts = (type, accepts) => {
    if (accepts !== 'y' && accepts !== 'n') {
      return byType[type];
    }

    return byType[type].filter(doctor => doctor.accepts === accepts);
  };

  const findByTypeAndNameSlug = (type, nameSlug) =>
    byType[type].find(doctor => doctor.nameSlug === nameSlug);

  return Object.freeze({
    all: doctorsValues,
    filterByTypeAndAccepts,
    findByTypeAndNameSlug,
  });
}
