import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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
    <FormControl component="fieldset">
      <FormLabel component="legend">Tip zdravnika</FormLabel>
      <RadioGroup
        row
        aria-label="tip"
        name="row-radio-buttons-group"
        value={doctorType}
        onChange={onChangeHandler}
      >
        {types.map(type => (
          <FormControlLabel
            key={type}
            disabled={!doctors}
            value={type}
            control={<Radio />}
            label={typesDict[type]['description-sl']}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
