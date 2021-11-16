import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import { Chip } from '../Shared';
import * as Styled from './styles';

import DateRangeIcon from '@mui/icons-material/DateRange';

const SubHeader = ({ availability, load, typeText, acceptText, accepts }) => {
  const tooltip = (
    <Stack sx={{ textAlign: 'center' }}>
      <Typography variant="caption">Glavarinski količnik</Typography>
      <Typography variant="body2">{parseFloat(load)}</Typography>
    </Stack>
  );

  const getBadgeColor = availability => {
    if (availability >= 1) return 'info';
    return;
  };

  const availabilityText = new Intl.NumberFormat('sl-SL', {
    style: 'percent',
  }).format(availability);

  return (
    <Stack sx={{ alignItems: 'start' }} spacing={1}>
      <Stack
        direction="row"
        marginTop="0.75rem"
        sx={{ justifyContent: 'space-between', width: '100%' }}
      >
        <Chip.Info text={typeText} />
        <Tooltip title={tooltip} placement="right-start">
          <Styled.AvailabilityBadge
            color={getBadgeColor(availability)}
            badgeContent={availabilityText}
            sx={{ cursor: 'help' }}
          >
            <DateRangeIcon sx={{ marginRight: '0.5rem', color: 'white' }} />
          </Styled.AvailabilityBadge>
        </Tooltip>
      </Stack>
      <Chip.FilledAccepts text={acceptText} accept={accepts} />
    </Stack>
  );
};

export default SubHeader;
