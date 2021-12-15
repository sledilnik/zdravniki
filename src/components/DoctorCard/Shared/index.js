import { t } from 'i18next';
import * as Icons from 'components/Shared/Icons';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import {
  TypeTranslate,
  AgeGroupTranslate,
  TypeIconTranslate,
  AgeGroupIconTranslate,
} from '../dicts';
import * as Styled from '../styles';

export * as Tooltip from './Tooltips';

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

export const DoubleChip = function DoubleChip({ type, ageGroup }) {
  const drType = t(TypeTranslate[type]);
  const drAgeGroup = t(AgeGroupTranslate?.[ageGroup] ?? 'adults');
  const typeIcon = TypeIconTranslate[type] ?? 'Family';
  const ageGroupIcon = AgeGroupIconTranslate?.[ageGroup] ?? 'Adults';
  return (
    <Styled.PageInfo.DCWrapper direction="row">
      <Styled.PageInfo.First direction="row" component="span" spacing={1}>
        <Icons.Icon name={typeIcon} className="icon" />
        <span className="text">{t(`${drType}`)}</span>
      </Styled.PageInfo.First>
      <Styled.PageInfo.Second direction="row" component="span" spacing={1}>
        <span className="text">{t(`${drAgeGroup}`)}</span>
        <Icons.Icon name={ageGroupIcon} className="icon" />
      </Styled.PageInfo.Second>
    </Styled.PageInfo.DCWrapper>
  );
};
