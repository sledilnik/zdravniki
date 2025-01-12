import gynDoseganjePovprecja from 'assets/data/analytics/pivotke-D/pivot_ginekologi_doseganje_povprecja.json';
import gynObseg from 'assets/data/analytics/pivotke-D/pivot_ginekologi_obseg.json';
import gpGlavarina from 'assets/data/analytics/pivotke-D/pivot_zdravniki_glavarina.json';
import gpGlavarinaMean from 'assets/data/analytics/pivotke-D/pivot_zdravniki_glavarina_mean.json';
import gpObseg from 'assets/data/analytics/pivotke-D/pivot_zdravniki_obseg.json';
import denDoseganjePovprecja from 'assets/data/analytics/pivotke-D/pivot_zobozdravniki_doseganje_povprecja.json';
import denObseg from 'assets/data/analytics/pivotke-D/pivot_zobozdravniki_obseg.json';

const files = Object.freeze({
  gynDoseganjePovprecja,
  gynObseg,
  gpGlavarinaMean,
  gpGlavarina,
  gpObseg,
  denDoseganjePovprecja,
  denObseg,
});

// Define data groups for categorization
const dataGroups = Object.freeze({
  avg: Object.freeze(['gynDoseganjePovprecja', 'gpGlavarinaMean', 'denDoseganjePovprecja']),
  vol: Object.freeze(['gynObseg', 'gpObseg', 'denObseg']),
  capitation: Object.freeze(['gpGlavarina']),
});

const groupOrder = Object.freeze({
  avg: 2,
  vol: 1,
  capitation: 0,
});

/**
 * @type {readonly { label: string, options: {name: string, label: string, value: string} }[]}
 */
export const groupOptions = Object.entries(dataGroups)
  .map(([label, opts]) => ({
    label,
    options: opts.map(value => ({
      name: 'data',
      label: value,
      value,
      group: label,
    })),
  }))
  .sort((a, b) => groupOrder[a.label] - groupOrder[b.label]);

export const parsedData = Object.entries(files)?.reduce((acc, [fileName, items]) => {
  const data = { public: [], private: [] };
  items.forEach(item => {
    const { datum, javni, zasebni } = item;
    const [year, month, day] = datum.split('-');
    const date = Date.UTC(year, month - 1, day);
    data.public.push([date, Number(parseFloat(javni).toFixed(2))]);
    data.private.push([date, Number(parseFloat(zasebni).toFixed(2))]);
  });
  acc[fileName] = data;
  return acc;
}, {});
