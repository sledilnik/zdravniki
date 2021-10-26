import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { filterContext } from 'context';

export default function ChooseDoctorType() {
  const { accept, setAccept } = filterContext.useFilter();

  const onChangeHandler = event => {
    setAccept(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Sprejema</FormLabel>
      <RadioGroup
        row
        aria-label="vsi, sprejema, ne sprejema"
        name="accept-radio-button-group"
        value={accept}
        onChange={onChangeHandler}
      >
        <FormControlLabel value="vsi" control={<Radio />} label="Vsi" />
        <FormControlLabel value="sprejema" control={<Radio />} label="Sprejema" />
        <FormControlLabel value="ne sprejema" control={<Radio />} label="Ne sprejema" />
      </RadioGroup>
    </FormControl>
  );
}
