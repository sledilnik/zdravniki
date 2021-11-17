import { Grid } from 'components/Shared';
import ChooseDoctorType from './ChooseDoctorType';
import ToggleAccepts from './ToggleAccepts';

export default function Filters() {
  return (
    <Grid.Filter>
      <ChooseDoctorType />
      <ToggleAccepts />
    </Grid.Filter>
  );
}
