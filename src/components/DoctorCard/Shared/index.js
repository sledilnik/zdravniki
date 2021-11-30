import { styled } from '@mui/material/styles';

import { t } from 'i18next';
import {
  TypeTranslate,
  AgeGroupTranslate,
  TypeIconTranslate,
  AgeGroupIconTranslate,
} from '../dicts';
import * as Icons from 'components/Shared/Icons';

import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as Styled from '../styles';

export * as Tooltip from './Tooltips';
export const Link = ({ children, ...props }) => (
  <Styled.Link rel="noopener noreferrer" target="_blank" {...props} underline="none">
    {children}
  </Styled.Link>
);
export const ConditionalLink = ({ children, to, component = 'div' }) => {
  return (
    <Typography component={component}>
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
    <DCWrapper direction="row">
      <First direction="row" component="span" spacing={1}>
        <Icons.Icon name={typeIcon} className="icon" />
        <span className="text">{t(`${drType}`)}</span>
      </First>
      <Second direction="row" component="span" spacing={1}>
        <span className="text">{t(`${drAgeGroup}`)}</span>
        <Icons.Icon name={ageGroupIcon} className="icon" />
      </Second>
    </DCWrapper>
  );
};

export const DCWrapper = styled(Stack)(({ theme }) => {
  return {
    color: theme.customColors.doctor.colors.chip,
    fontSize: '0.8125rem',
    fontWeight: 400,
    letterSpacing: 0,
    borderRadius: '5px',
    '.icon': {
      opacity: 0.25,
    },
    '.text': {
      opacity: 0.56,
    },
  };
});

const First = styled(Stack)(({ theme }) => {
  return {
    backgroundColor: '#F5F5F1',
    padding: '6px 8px',
    borderRadius: '5px 0 0 5px',
  };
});
const Second = styled(Stack)(({ theme }) => {
  return {
    backgroundColor: '#EAEAE3',
    padding: '6px 8px',
    borderRadius: '0 5px 5px 0',
  };
});
