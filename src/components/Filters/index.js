import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Grid } from 'components/Shared';
import { ChooseDoctorType, ChooseAccept } from 'components/Filters';

export { default as ChooseDoctorType } from './ChooseDoctorType';
export { default as ChooseAccept } from './ChooseAccept';
export { default as PerPage } from './PerPage';

export default function Filters() {
  return (
    <Accordion sx={{ marginBlock: '1em' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="filters-content">
        <Typography>Filtri</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid.Filter>
          <ChooseDoctorType />
          <ChooseAccept />
        </Grid.Filter>
      </AccordionDetails>
    </Accordion>
  );
}
