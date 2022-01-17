import { useTranslation } from 'react-i18next';
import { useLocation, matchPath } from 'react-router-dom';

import { DOCTORS } from 'const';
import { useState } from 'react';

const VSI = ['vsi', 'all'];
const Y = ['y', 'yes', 'd', 'da', 1];
const N = ['n', 'no', 'ne', 0];

const ACCEPTS = {
  vsi: VSI,
  y: Y,
  n: N,
};

export default function useDoctorTypeExactPath() {
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
  const [ageGroup] = useState(isValidPath ? DOCTORS.TYPE_AGE_GROUPS[path] : 'adults'); // maybe should be null if not validPath

  const rawHashValues = isValidPath ? location?.hash.replace('#', '').split('|') : null;

  const hashValues = rawHashValues?.reduce(
    (acc, val) => {
      if (val?.startsWith('a-') && Object.values(ACCEPTS).flat().includes(val.replace('a-', ''))) {
        acc.accepts = val.replace('a-', '');
        return acc;
      }

      if (val?.startsWith('l-')) {
        const leaflet = val?.replace('l-', '').split('/');
        if (leaflet.length === 3) {
          const [zoom, lat, lng] = leaflet;
          acc.zoom = +zoom;
          acc.loc = [+lat, +lng];
          return acc;
        }
      }

      if (val?.startsWith('s-')) {
        acc.search = decodeURI(val.replace('s-', ''));
        return acc;
      }

      return acc;
    },
    {
      search: null,
      loc: null,
      zoom: null,
      accepts: null,
    },
  );

  const [accepts] = useState(hashValues?.accepts);
  const [loc] = useState(hashValues?.loc);
  const [zoom] = useState(hashValues?.zoom);
  const [search] = useState(hashValues?.search);

  return {
    pathObj: typePathObj,
    type: path,
    drType,
    ageGroup,
    accepts,
    loc,
    zoom,
    search,
    isValidPath,
  };
}
