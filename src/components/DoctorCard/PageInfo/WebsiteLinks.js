import PropTypes from 'prop-types';
import DoctorLinks from '../Shared/DoctorLinks';

function withDoctorLinks(Component) {
  const WebsiteLinks = function WebsiteLinks({ website }) {
    const websites = website
      ?.split(',')
      .map(w => {
        const url = w?.trim();
        if (url.startsWith('http')) {
          return new URL(url);
        }
        return new URL(`http://${url}`);
      })
      .filter(w => Boolean(w));

    return <Component links={websites} iconName="LinkBig" />;
  };

  WebsiteLinks.propTypes = {
    website: PropTypes.string.isRequired,
  };

  return WebsiteLinks;
}

export default withDoctorLinks(DoctorLinks);
