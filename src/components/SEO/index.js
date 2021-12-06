import { Helmet } from 'react-helmet-async';

export const Dynamic = function Dynamic({ title, meta = [], lang = 'sl', ...props }) {
  return <Helmet title={title} htmlAttributes={{ lang }} meta={meta} {...props} />;
};
