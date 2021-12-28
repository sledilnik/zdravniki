import { t } from 'i18next';
import slugify from 'slugify';

import { DOCTORS } from 'const';

const trimString = str => str.replace(/\s+/g, ' ').trim();

const getAddressObject = (doctor, institution) => {
  const post = doctor.post || institution.post;
  const [postalCode, ...postalName] = post.split(' ');
  return {
    street: doctor.address || institution.address,
    city: doctor.city || institution.city,
    municipalityPart: doctor.municipalityPart || institution.municipalityPart,
    municipality: doctor.municipality || institution.municipality,
    postalCode,
    post: postalName.join(' '),
  };
};

export function createDoctor(doctor, institution) {
  const name = trimString(doctor.doctor);
  const nameSlug = slugify(name.toLowerCase());
  const instId = trimString(doctor.id_inst);

  const munUnit = trimString(institution.unit);
  const provider = trimString(institution.name);
  const website = trimString(doctor.website || institution.website);
  const phone = trimString(doctor.phone || institution.phone);

  const geoLocation = {
    lat: parseFloat(doctor.lat || institution.lat),
    lon: parseFloat(doctor.lon || institution.lon),
  };

  const addressObject = getAddressObject(doctor, institution);

  const {
    accepts: acceptsZZZS,
    accepts_override: acceptsOverride,
    availability: availabilityZZZS,
    availability_override: availabilityOverride,
    date_override: dateOverride,
    email,
    load,
    note_override: noteOverride,
    orderform,
  } = doctor;

  const accepts = acceptsOverride || acceptsZZZS;
  const getAcceptText = () => (accepts === 'y' ? t('accepts') : t('rejects'));

  const formatUpdatedAt = (lng = 'sl') => {
    const lngTranslate = {
      sl: 'sl-SL',
      en: 'en-GB',
    };

    return new Intl.DateTimeFormat(lngTranslate[lng]).format(new Date(dateOverride));
  };

  return Object.freeze({
    get accepts() {
      return accepts;
    },
    get acceptsOverride() {
      return acceptsOverride;
    },
    get acceptsZZZS() {
      return acceptsZZZS;
    },
    get availability() {
      return availabilityOverride || availabilityZZZS;
    },
    get availabilityOverride() {
      return availabilityOverride;
    },
    get availabilityZZZS() {
      return availabilityZZZS;
    },
    get email() {
      return email;
    },
    get fullAddress() {
      return `${addressObject.street}, ${addressObject.postalCode} ${addressObject.post}`;
    },
    get geoLocation() {
      return geoLocation;
    },
    get instId() {
      return instId;
    },
    get key() {
      return doctor.key;
    },
    get load() {
      return load;
    },
    get munUnit() {
      return munUnit;
    },
    get name() {
      return name;
    },
    get nameSlug() {
      return nameSlug;
    },
    get note() {
      return noteOverride;
    },
    get orderform() {
      return orderform;
    },
    get phone() {
      return phone;
    },
    get provider() {
      return provider;
    },
    get searchAddress() {
      return `${addressObject.street}, ${addressObject.postalCode} ${addressObject.city} ${addressObject.municipalityPart} ${addressObject.municipality}`;
    },
    get type() {
      return doctor.type;
    },
    get updatedAt() {
      return dateOverride;
    },
    get website() {
      return website;
    },
    getAcceptText,
    formatUpdatedAt,
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

  const findByTypeAndNameSlug = (type, nameSlug, instId) =>
    byType[type].find(doctor => doctor.nameSlug === nameSlug && doctor.instId === instId);

  return Object.freeze({
    all: doctorsValues,
    filterByTypeAndAccepts,
    findByTypeAndNameSlug,
  });
}
