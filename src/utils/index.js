import L from 'leaflet';

export function fromArrayWithHeader(arr = []) {
  const header = arr[0];
  const data = arr.slice(1, -1);
  return data.reduce((acc1, dataItem) => {
    const type = dataItem.reduce(
      (acc2, value, index) => ({
        ...acc2,
        [header[index]]: value,
      }),
      {},
    );
    return {
      ...acc1,
      [dataItem[0]]: type,
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
