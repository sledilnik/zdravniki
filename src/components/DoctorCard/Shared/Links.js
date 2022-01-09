import PropTypes from 'prop-types';

import { Typography } from '@mui/material';

import * as Styled from '../styles';
import { ChildrenPropType } from '../../../types';
// todo find better solution
export const Link = function Link({ children, self, ...props }) {
  const target = self ? {} : { target: '_blank' };
  return (
    <Styled.Link rel="noopener noreferrer" {...target} underline="none" {...props}>
      {children}
    </Styled.Link>
  );
};

Link.propTypes = {
  children: ChildrenPropType,
  self: PropTypes.bool,
};

Link.defaultProps = {
  children: undefined,
  self: undefined,
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
    <Link href={to} self={self ? true : undefined}>
      {children}
    </Link>
  );
  return (
    <Typography component={component} {...props}>
      {to ? link : children}
    </Typography>
  );
};

ConditionalLink.propTypes = {
  children: ChildrenPropType,
  to: PropTypes.string,
  component: PropTypes.string,
  self: PropTypes.bool,
};

ConditionalLink.defaultProps = {
  children: undefined,
  to: undefined,
  component: undefined,
  self: undefined,
};
