export function fromArrayWithHeader(arr = []) {
  const header = arr[0];
  const data = arr.slice(1, -1);
  return data.reduce((acc1, dataItem) => {
    const type = dataItem.reduce((acc2, value, index) => {
      acc2[header[index]] = value;
      return acc2;
    }, {});
    acc1[dataItem[0]] = type;
    return acc1;
  }, {});
}
