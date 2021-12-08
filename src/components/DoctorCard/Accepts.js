import * as Icons from 'components/Shared/Icons';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import * as Styled from './styles';

const Accepts = function Accepts({ accepts }) {
  const iconName = accepts ? 'CheckGreen' : 'BanRed';
  const text = accepts ? t('accepts').toUpperCase() : t('rejects').toUpperCase();

  return (
    <Styled.AcceptsStack direction="row" accepts={accepts}>
      <Icons.Icon name={iconName} />
      {text}
    </Styled.AcceptsStack>
  );
};

Accepts.propTypes = {
  accepts: PropTypes.bool.isRequired,
};

export default Accepts;
