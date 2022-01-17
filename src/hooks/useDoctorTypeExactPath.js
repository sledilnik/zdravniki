import { useTranslation } from 'react-i18next';
import { useLocation, matchPath } from 'react-router-dom';

import { DOCTORS } from 'const';
import { useState } from 'react';

const AGE_GROUP_TRANLATE = {
  gp: 'adults',
  ped: 'youth',
  gyn: 'adults',
  den: 'adults',
  'den-y': 'youth',
  'den-s': 'students',
};

export default function useDoctorExactPath() {
  const {
    i18n: { languages },
  } = useTranslation();
  const location = useLocation();

  const typePathObj = languages
    .map(lang => matchPath(`/${lang}/:type`, location.pathname))
    .filter(paramKey => Boolean(paramKey))?.[0];

  const type = typePathObj?.params?.type;

  const isValidPath = DOCTORS.TYPES.includes(type);
  const [path] = useState(isValidPath ? type : null);
  const [drType] = useState(isValidPath ? type.split('-')[0] : null);
  const [ageGroup] = useState(isValidPath ? AGE_GROUP_TRANLATE[path] : null);

  return { pathObj: typePathObj, type: path, drType, ageGroup, isValidPath };
}
