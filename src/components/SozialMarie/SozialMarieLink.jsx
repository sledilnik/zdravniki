import { t } from 'i18next';
import PropTypes from 'prop-types';

const SozialMarieLink = function SozialMarieLink({ href }) {
  const sozialMarieTranslations = t('sozialMarie', { returnObjects: true });

  return (
    <p>
      {sozialMarieTranslations.clicking}{' '}
      <a href={href} target="_blank" rel="noopener noreferrer">
        {sozialMarieTranslations.thisLink}
      </a>{' '}
      {sozialMarieTranslations.inNewTab}
    </p>
  );
};

SozialMarieLink.defaultProps = {
  href: '#',
};

SozialMarieLink.propTypes = {
  href: PropTypes.string,
};

export default SozialMarieLink;
