import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@mui/material';

import * as Icons from 'components/Shared/Icons';

const PhoneButton = function PhoneButton({ phone }) {
  const { t } = useTranslation();
  const title = phone || t('doctorCard.noPhone');
  const classes = phone ? '' : 'icon--disabled';
  const iconName = phone ? 'PhoneBig' : 'NoPhoneBig';

  return (
    <Tooltip title={title}>
      <IconButton href={phone ? `tel:${phone}` : undefined} className={classes}>
        <Icons.Icon name={iconName} />
      </IconButton>
    </Tooltip>
  );
};

PhoneButton.defaultProps = {
  phone: '',
};

PhoneButton.propTypes = {
  phone: PropTypes.string,
};

export default PhoneButton;
