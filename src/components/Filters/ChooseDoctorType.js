import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { doctorsContext, filterContext } from 'context';

export default function ChooseDoctorType() {
  const { doctorType, setDoctorType } = filterContext.useFilter();
  const { doctors } = doctorsContext.useDoctors();

  const types = doctors?.types ?? [];
  const typesDict = doctors?.typesDict;

  const onChangeHandler = event => {
    setDoctorType(event.target.value);
  };

  if (types.length === 0) {
    return null;
  }

  return (
    <FormControl sx={{ minWidth: 120, maxWidth: 220 }}>
      <InputLabel id="doctor-type-label">Tip</InputLabel>
      <Select
        labelId="doctor-type-label"
        id="doctor-type"
        value={doctorType}
        label="Tip"
        onChange={onChangeHandler}
      >
        {types.map(type => (
          <MenuItem
            key={type}
            disabled={!doctors}
            value={type}
            label={typesDict[type]['description-sl']}
          >
            {typesDict[type]['description-sl']}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
