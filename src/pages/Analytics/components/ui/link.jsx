import PropTypes from 'prop-types';

import { Link as LinkShared } from 'components/DoctorCard/Shared';

import styles from './link.module.css';

export const Link = function Link({ children, ...props }) {
  return (
    <LinkShared className={styles.Link} {...props}>
      {children}
    </LinkShared>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
};
