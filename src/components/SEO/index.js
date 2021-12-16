import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export const LdJson = function LdJson({ json }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(json)}</script>
    </Helmet>
  );
};

LdJson.propTypes = {
  json: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export const Dynamic = function Dynamic({ title, meta, lang, scripts }) {
  return <Helmet title={title} htmlAttributes={{ lang }} meta={meta} scripts={scripts} />;
};

Dynamic.defaultProps = {
  title: 'Zdravniki - Sledilnik',
  meta: [],
  lang: process.env.REACT_APP_DEFAULT_LANGUAGE,
  scripts: [],
};

Dynamic.propTypes = {
  title: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, content: PropTypes.string })),
  lang: PropTypes.oneOf(['sl', 'en']),
  scripts: PropTypes.arrayOf(PropTypes.object),
};
