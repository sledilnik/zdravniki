import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { filterContext } from 'context';
import Badge from '@mui/material/Badge';

export default function ChooseDoctorType() {
  const { doctors, accept, setAccept } = filterContext.useFilter();

  const badgeContent = {
    all: accept === 'vsi' ? doctors?.length : 0,
    yes: accept === 'y' ? doctors?.length : 0,
    no: accept === 'n' ? doctors?.length : 0,
  };

  const onChangeHandler = event => {
    setAccept(event.target.value);
  };

  return (
    <FormControl component="fieldset" disabled={!doctors}>
      <FormLabel component="legend">Sprejema</FormLabel>
      <RadioGroup
        row
        aria-label="vsi, sprejema, ne sprejema"
        name="accept-radio-button-group"
        value={accept}
        onChange={onChangeHandler}
      >
        <FormControlLabel
          value="vsi"
          control={<Radio />}
          label={
            <Badge badgeContent={badgeContent.all} color="primary" max={99}>
              Vsi
            </Badge>
          }
        />
        <FormControlLabel
          value="y"
          control={<Radio />}
          label={
            <Badge badgeContent={badgeContent.yes} color="success" max={99}>
              Sprejema
            </Badge>
          }
        />
        <FormControlLabel
          value="n"
          control={<Radio />}
          label={
            <Badge badgeContent={badgeContent.no} color="error" max={99}>
              Ne sprejema
            </Badge>
          }
        />
      </RadioGroup>
    </FormControl>
  );
}
