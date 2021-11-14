import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';

import { Chip, Grid } from 'components/Shared';
import { ChooseDoctorType, ChooseAccept } from 'components/Filters';
import { useFilter } from 'context/filterContext';
import { useDoctors } from 'context/doctorsContext';

export { default as ChooseDoctorType } from './ChooseDoctorType';
export { default as ChooseAccept } from './ChooseAccept';
export { default as PerPage } from './PerPage';

export default function Filters() {
  const { doctorType, accept } = useFilter();
  const { dicts } = useDoctors();

  const typeText = dicts?.types?.[doctorType]['description-sl'];

  return (
    <Accordion sx={{ marginBlock: '1em' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="filters-content">
        <Stack direction="row" spacing={1}>
          <Typography>Filtri:</Typography>
          <Chip.Info text={typeText} />
          {accept === 'vsi' && <Chip.Info text="Vsi" />}
          {accept === 'y' && <CheckCircleIcon color="success" />}
          {accept === 'n' && <CancelIcon color="error" />}
        </Stack>
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
