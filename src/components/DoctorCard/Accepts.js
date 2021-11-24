import Stack from '@mui/material/Stack';

import * as Icons from 'components/Shared/Icons';
import * as Styled from './styles';

const Accepts = ({ accepts }) => {
  const iconName = accepts === 'true' ? 'CheckGreen' : 'BanRed';
  const text = accepts === 'true' ? 'SPREJEMA' : 'NE SPREJEMA';

  return (
    <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
      <Icons.Icon name={iconName} />
      <Styled.Accepts variant="caption" accepts={accepts}>
        {text}
      </Styled.Accepts>
    </Stack>
  );
};

export default Accepts;