import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { doctorsContext, filterContext } from 'context';

export default function ChooseDoctorType() {
  const { doctorType, setDoctorType } = filterContext.useFilter();
  const { doctors, gyno, dentists } = doctorsContext.useDoctors();

  const onChangeHandler = event => {
    setDoctorType(event.target.value);
  };

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
        <FormControlLabel disabled={!doctors} value="doctors" control={<Radio />} label="Splošni" />
        <FormControlLabel disabled={!gyno} value="gyno" control={<Radio />} label="Ginekolog" />
        <FormControlLabel
          disabled={!dentists}
          value="dentists"
          control={<Radio />}
          label="Zobozdravnik"
        />
      </RadioGroup>
    </FormControl>
  );
}
