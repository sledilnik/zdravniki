import { FormControlLabel, Checkbox } from '@mui/material';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { memo } from 'react';

const AlertFooterContent = function AlertFooter({ checked, handleChecked, isBefore, lang }) {
  const sozialMarieTranslations = t('sozialMarie', { returnObjects: true });
  const label = isBefore
    ? sozialMarieTranslations.noShowBefore
    : sozialMarieTranslations.noShowDuring;

  return (
    <>
      <FormControlLabel
        key={lang}
        labelPlacement="start"
        control={
          <Checkbox name="no-show" checked={checked} onChange={handleChecked} size="small" />
        }
        label={label}
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
  isBefore: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
};

const areEqual = (prevProps, nextProps) =>
  prevProps.checked === nextProps.checked &&
  prevProps.isBefore === nextProps.isBefore &&
  prevProps.lang === nextProps.lang;

export default memo(AlertFooterContent, areEqual);
