import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

import { languages } from 'i18n';

export const Dynamic = function Dynamic({ title, meta, lang }) {
  return <Helmet title={title} htmlAttributes={{ lang }} meta={meta} />;
};

Dynamic.defaultProps = {
  title: 'Zdravniki - Sledilnik',
  meta: [],
  lang: process.env.REACT_APP_DEFAULT_LANGUAGE,
};

Dynamic.propTypes = {
  title: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  lang: PropTypes.oneOf(languages.map(lang => lang.code)),
};
