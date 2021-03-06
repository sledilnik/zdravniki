import PropTypes from 'prop-types';
import StyleProp from 'react-style-proptype';

export const StylePropType = StyleProp;

export const DoctorPropType = PropTypes.shape({
  accepts: PropTypes.string,
  availabilityZZZS: PropTypes.string,
  availability: PropTypes.string,
  availabilityOverride: PropTypes.string,
  email: PropTypes.string,
  fullAddress: PropTypes.string,
  geoLocation: PropTypes.shape({
    lat: PropTypes.number,
    lon: PropTypes.number,
  }),
  instId: PropTypes.string,
  key: PropTypes.string,
  load: PropTypes.string,
  munUnit: PropTypes.string,
  name: PropTypes.string,
  nameSlug: PropTypes.string,
  note: PropTypes.string,
  orderform: PropTypes.string,
  phone: PropTypes.string,
  provider: PropTypes.string,
  searchAddress: PropTypes.string,
  type: PropTypes.string,
  updatedAt: PropTypes.string,
  website: PropTypes.string,
  getAcceptText: PropTypes.func,
  formatUpdatedAt: PropTypes.func,
});

export const ChildrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);
