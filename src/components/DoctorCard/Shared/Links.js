import PropTypes from 'prop-types';

import { Typography } from '@mui/material';

import * as Styled from '../styles';
// todo find better solution
export const Link = function Link({ children, self, ...props }) {
  const target = self ? {} : { target: '_blank' };
  return (
    <Styled.Link rel="noopener noreferrer" {...target} underline="none" {...props}>
      {children}
    </Styled.Link>
  );
};

// ? uh, needs refactoring; somehow it feels I can join Link and LinkNoRel
export const LinkNoRel = function LinkRegular({ href, onClick, children }) {
  return (
    <Styled.Link underline="none" href={href} onClick={onClick}>
      {children}
    </Styled.Link>
  );
};

LinkNoRel.defaultProps = {
  onClick: () => {},
};

LinkNoRel.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
  onClick: PropTypes.func,
};
export const ConditionalLink = function ConditionalLink({
  children,
  to,
  component = 'div',
  self,
  ...props
}) {
  const link = (
    <Link href={to} self={self}>
      {children}
    </Link>
  );
  return (
    <Typography component={component} {...props}>
      {to ? link : children}
    </Typography>
  );
};
