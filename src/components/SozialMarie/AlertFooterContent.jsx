import { FormControlLabel, Checkbox } from '@mui/material';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { memo } from 'react';

const AlertFooterContent = function AlertFooter({ checked, handleChecked }) {
  const sozialMarieTranslations = t('sozialMarie', { returnObjects: true });
  return (
    <>
      <FormControlLabel
        labelPlacement="start"
        control={
          <Checkbox name="no-show" checked={checked} onChange={handleChecked} size="small" />
        }
        label={sozialMarieTranslations.noShow}
        sx={{
          marginInline: 0,
          '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
        }}
      />
      <p>{sozialMarieTranslations.seeAlert}</p>
    </>
  );
};

AlertFooterContent.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleChecked: PropTypes.func.isRequired,
};

const areEqual = (prevProps, nextProps) => prevProps.checked === nextProps.checked;

export default memo(AlertFooterContent, areEqual);
