import { t } from 'i18next';
import {
  TypeTranslate,
  AgeGroupTranslate,
  TypeIconTranslate,
  AgeGroupIconTranslate,
} from '../dicts';
import * as Icons from 'components/Shared/Icons';

import Typography from '@mui/material/Typography';
import * as Styled from '../styles';

export * as Tooltip from './Tooltips';
export const Link = ({ children, ...props }) => (
  <Styled.Link rel="noopener noreferrer" target="_blank" underline="none" {...props}>
    {children}
  </Styled.Link>
);
export const ConditionalLink = ({ children, to, component = 'div', ...props }) => {
  return (
    <Typography component={component} {...props}>
      {to ? <Link href={to}>{children}</Link> : <>{children}</>}
    </Typography>
  );
};

export const DoubleChip = ({ type, ageGroup }) => {
  const drType = TypeTranslate[type];
  const drAgeGroup = AgeGroupTranslate?.[ageGroup] ?? 'adults';
  const typeIcon = TypeIconTranslate[type];
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
