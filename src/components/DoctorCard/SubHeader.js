import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import { Chip } from '../Shared';
import { EmojiPeopleIcon } from 'components/Shared/Icons';
import * as Styled from './styles';

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
      <Stack spacing={1} direction="row" marginTop="0.75rem">
        <Chip.Info text={typeText} />
        <Tooltip title={tooltip} placement="right-start" sx={{ cursor: 'help', margin: '1rem' }}>
          <Styled.AvailabilityBadge
            color={getBadgeColor(availability)}
            badgeContent={availabilityText}
            sx={{ cursor: 'help' }}
          >
            <EmojiPeopleIcon sx={{ marginRight: '1.1rem', color: 'white' }} />
          </Styled.AvailabilityBadge>
        </Tooltip>
      </Stack>
      <Chip.FilledAccepts text={acceptText} accept={accepts} />
    </Stack>
  );
};

export default SubHeader;
