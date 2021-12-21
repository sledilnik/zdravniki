import L from 'leaflet';
import { v4 as uuidv4 } from 'uuid';

export function fromArrayWithHeader(arr = [], uniqueFieldName = '') {
  const header = arr[0];

  // it's dirty but quick fix while doctor's id might to be available in the future.
  const idIndex = header.findIndex(item => item === uniqueFieldName);
  if (uniqueFieldName && idIndex === -1)
    throw new Error(`Field "${uniqueFieldName}" does not exist!`);

  const data = arr.slice(1, -1);
  return data.reduce((acc1, dataItem) => {
    const type = dataItem.reduce(
      (acc2, value, index) => ({
        ...acc2,
        [header[index]]: value,
      }),
      {},
    );

    const key = idIndex !== -1 ? dataItem[idIndex] : uuidv4();

    if (idIndex === -1) {
      type.key = key;
    }
    return {
      ...acc1,
      [key]: type,
    };
  }, {});
}

export function filterBySearchValueInMapBounds({ searchValue = '', filtered = [], bounds }) {
  return filtered?.filter(doctor => {
    const { lat, lon } = doctor.geoLocation;
    const corner = L.latLng(lat, lon);
    const calculatedBounds = L.latLngBounds(corner, corner);

    if (!searchValue) {
      return bounds.intersects(calculatedBounds);
    }

    const isBySearchValue =
      doctor.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      doctor.searchAddress.toLowerCase().includes(searchValue.toLowerCase()) ||
      doctor.provider.toLowerCase().includes(searchValue.toLowerCase());

    return bounds.intersects(calculatedBounds) && isBySearchValue;
  });
}
