import { Helmet } from 'react-helmet-async';

export const Static = ({ children }) => {
  return (
    <Helmet>
      <html lang="en" />
      <title>Hello from React Helmet</title>
      <meta name="description" content="Basic example" />
      {children}
    </Helmet>
  );
};

export const Dynamic = ({ title, meta = [], lang = 'sl', ...props }) => {
  return <Helmet title={title} htmlAttributes={{ lang }} meta={meta} {...props} />;
};
