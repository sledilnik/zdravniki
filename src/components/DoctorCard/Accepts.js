import Stack from '@mui/material/Stack';

import * as Icons from 'components/Shared/Icons';
import { t } from 'i18next';
import * as Styled from './styles';

const Accepts = function Accepts({ accepts }) {
  const iconName = accepts === 'true' ? 'CheckGreen' : 'BanRed';
  const text = accepts === 'true' ? t('accepts').toUpperCase() : t('rejects').toUpperCase();

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
