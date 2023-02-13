import { useParams } from 'react-router-dom';
import { t } from 'i18next';

import { Tooltip } from '@mui/material';

import PropTypes from 'prop-types';

import SingleChart from 'components/Shared/CircleChart';
import * as Icons from 'components/Shared/Icons';

import Accepts from './Accepts';

import {
  TypeTranslate,
  AgeGroupTranslate,
  TypeIconTranslate,
  AgeGroupIconTranslate,
} from '../dicts';
import * as Styled from '../styles';

import { toPercent } from '../utils';

import * as Tooltips from './Tooltips';

export * as Tooltip from './Tooltips';

// it would be better to import just like Tooltip but don't want to make to many changes all over the code
export { Link, LinkNoRel, ConditionalLink } from './Links';

export { default as DoctorLinks } from './DoctorLinks';
export { default as PhoneButton } from './PhoneButton';
export { default as Accepts } from './Accepts';

export const DoubleChip = function DoubleChip({ type, ageGroup, isExtra, isPageView }) {
  const drType = t(TypeTranslate[type]);
  const drAgeGroup = t(AgeGroupTranslate?.[ageGroup] ?? 'adults');
  const typeIcon = TypeIconTranslate[type] ?? 'Family';
  const ageGroupIcon = AgeGroupIconTranslate?.[ageGroup] ?? 'Adults';

  const isDentist = type === 'den';

  const first = (
    <Styled.PageInfo.First single={!isDentist ? 1 : 0} direction="row" component="span" spacing={1}>
      <Icons.Icon name={typeIcon} className="icon" />
      <span className="text">{t(`${drType}`)}</span>
    </Styled.PageInfo.First>
  );

  const second = isDentist && (
    <Styled.PageInfo.Second direction="row" component="span" spacing={1}>
      <span className="text">{t(`${drAgeGroup}`)}</span>
      <Icons.Icon name={ageGroupIcon} className="icon" />
    </Styled.PageInfo.Second>
  );

  let isExtraLabel = '';
  let isExtraTooltip = t('clinicForBetterAccessibility');

  if (!isPageView) {
    /* empty */
  } else {
    isExtraLabel = t('clinicForBetterAccessibility');
    isExtraTooltip = t('clinicForBetterAccessibilityDesc');
  }

  const third = isExtra && (
    <Tooltip title={isExtraTooltip} leaveTouchDelay={3000} enterTouchDelay={50}>
      <Styled.IsExtra direction="row" alignItems="center" spacing={1} isPageView={isPageView}>
        <Icons.Icon name="ClinicViolet" />
        {isExtraLabel}
      </Styled.IsExtra>
    </Tooltip>
  );

  return (
    <Styled.PageInfo.DCWrapper direction="row">
      {first}
      {second}
      {third}
    </Styled.PageInfo.DCWrapper>
  );
};

DoubleChip.defaultProps = {
  ageGroup: undefined,
  isExtra: false,
  isPageView: false,
};

DoubleChip.propTypes = {
  type: PropTypes.string.isRequired,
  ageGroup: PropTypes.oneOf([undefined, 'students', 'youth']),
  isExtra: PropTypes.bool,
  isPageView: PropTypes.bool,
};

export const HeadQuotient = function HeadQuotient({ load, note, date, accepts, hasOverride }) {
  return (
    <Tooltip
      title={
        <Tooltips.HeadQuotient load={load} note={note} date={date} hasOverride={hasOverride} />
      }
      leaveTouchDelay={3000}
      enterTouchDelay={50}
    >
      <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
        <Accepts accepts={accepts} />
      </Styled.InfoWrapper>
    </Tooltip>
  );
};

HeadQuotient.defaultProps = {
  hasOverride: false,
};

HeadQuotient.propTypes = {
  date: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  load: PropTypes.string.isRequired,
  accepts: PropTypes.oneOf(['y', 'n']).isRequired,
  hasOverride: PropTypes.bool,
};

export const Availability = function Availability({ date, availability, hasOverride }) {
  const { lng } = useParams();
  const availabilityText = toPercent(availability, lng);

  return (
    <Tooltip
      title={<Tooltips.Availability date={date} hasOverride={hasOverride} />}
      leaveTouchDelay={3000}
      enterTouchDelay={50}
    >
      <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
        <SingleChart size="26px" percent={availability} />
        <Styled.Availability variant="caption">{availabilityText}</Styled.Availability>
      </Styled.InfoWrapper>
    </Tooltip>
  );
};

Availability.defaultProps = {
  hasOverride: false,
};

Availability.propTypes = {
  date: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  hasOverride: PropTypes.bool,
};
