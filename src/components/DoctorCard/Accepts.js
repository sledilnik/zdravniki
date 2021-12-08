import * as Icons from 'components/Shared/Icons';
import { t } from 'i18next';
import * as Styled from './styles';

const Accepts = function Accepts({ accepts }) {
  const iconName = accepts === 'true' ? 'CheckGreen' : 'BanRed';
  const text = accepts === 'true' ? t('accepts').toUpperCase() : t('rejects').toUpperCase();

  return (
    <Styled.AcceptsStack direction="row" accepts={accepts}>
      <Icons.Icon name={iconName} />
      {text}
    </Styled.AcceptsStack>
  );
};

export default Accepts;
