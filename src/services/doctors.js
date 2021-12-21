import { t } from 'i18next';

const trimString = str => str.replace(/\s+/g, ' ').trim();

const lng = localStorage.getItem('i18nextLng') || 'sl';

const TYPE_TRANSLATE = {
  SL: 'description-sl',
  EN: 'description',
};

export function createDoctor(doctor, type, institution) {
  const getTypeText = (lang = lng) => {
    const field = TYPE_TRANSLATE[lang.toUpperCase()];
    return type[field];
  };

  const getAcceptText = () => (doctor.accepts === 'y' ? t('accepts') : t('rejects'));

  const name = trimString(doctor.doctor);

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
    getTypeText,
    getAcceptText,
  });
}

export default function createDoctors({
  doctorsDict,
  institutionsDict,
  typesDict,
  keys = { instKey: 'id_inst', typesKey: 'type' },
}) {
  const { instKey, typeKey } = keys;

  const doctors = Object.entries(doctorsDict).reduce((acc, [doctorId, doctorData]) => {
    const doctor = createDoctor(
      doctorData,
      typesDict[doctorData[typeKey]],
      institutionsDict[doctorData[instKey]],
    );
    acc[doctorId] = doctor;
    return acc;
  }, {});

  const doctorValues = Object.values(doctors);
  const doctorsValues = Intl.Collator
    ? doctorValues.sort((a, b) => new Intl.Collator('sl').compare(a.name, b.name))
    : doctorValues.sort((a, b) => a.name.localeCompare(b.name, 'sl'));

  const filterByType = type => doctorsValues.filter(doctor => doctor.type === type);

  const types = Object.keys(typesDict);

  const byType = types.reduce((acc, type) => {
    acc[type] = filterByType(type);
    return acc;
  }, {});

  const filter = (type, accepts) => {
    if (accepts !== 'y' && accepts !== 'n') {
      return byType[type];
    }

    return byType[type].filter(doctor => doctor.accepts === accepts);
  };

  return Object.freeze({
    all: doctorsValues,
    types,
    filterByType,
    typesDict,
    filter,
  });
}
