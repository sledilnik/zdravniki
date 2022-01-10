import PropTypes from 'prop-types';
import DoctorLinks from '../Shared/DoctorLinks';

function withDoctorLinks(Component) {
  const PhoneLinks = function PhoneLinks({ phone }) {
    const phones = phone
      ?.split(',')
      .map(p => p.trim() && new URL(`tel:${p.trim()}`))
      .filter(p => Boolean(p));

    return <Component links={phones} iconName="PhoneBig" />;
  };

  PhoneLinks.propTypes = {
    phone: PropTypes.string.isRequired,
  };

  return PhoneLinks;
}

export default withDoctorLinks(DoctorLinks);
