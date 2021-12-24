import { t } from 'i18next';
import * as Icons from 'components/Shared/Icons';

import {
  TypeTranslate,
  AgeGroupTranslate,
  TypeIconTranslate,
  AgeGroupIconTranslate,
} from '../dicts';
import * as Styled from '../styles';

export * as Tooltip from './Tooltips';

// it would be better to import just like Tooltip but don't want to make to many changes all over the code
export { Link, LinkNoRel, ConditionalLink } from './Links';

export { default as PageInfoPhones } from './PageInfoPhones';
export { default as PhoneButton } from './PhoneButton';
export { default as Accepts } from './Accepts';

export const DoubleChip = function DoubleChip({ type, ageGroup }) {
  const drType = t(TypeTranslate[type]);
  const drAgeGroup = t(AgeGroupTranslate?.[ageGroup] ?? 'adults');
  const typeIcon = TypeIconTranslate[type] ?? 'Family';
  const ageGroupIcon = AgeGroupIconTranslate?.[ageGroup] ?? 'Adults';

  const isDentist = type === 'den';

  const first = isDentist ? (
    <Styled.PageInfo.First direction="row" component="span" spacing={1}>
      <Icons.Icon name={typeIcon} className="icon" />
      <span className="text">{t(`${drType}`)}</span>
    </Styled.PageInfo.First>
  ) : (
    <Styled.PageInfo.First single direction="row" component="span" spacing={1}>
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

  return (
    <Styled.PageInfo.DCWrapper direction="row">
      {first}
      {second}
    </Styled.PageInfo.DCWrapper>
  );
};
