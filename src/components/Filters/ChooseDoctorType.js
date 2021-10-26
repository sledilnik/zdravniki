import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { filterContext } from 'context';

export default function ChooseDoctorType() {
  const { doctorType, setDoctorType } = filterContext.useFilter();

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
        <FormControlLabel value="doctors" control={<Radio />} label="Splošni" />
        <FormControlLabel value="gyno" control={<Radio />} label="Ginekolog" />
        <FormControlLabel value="dentists" control={<Radio />} label="Zobozdravnik" />
      </RadioGroup>
    </FormControl>
  );
}
