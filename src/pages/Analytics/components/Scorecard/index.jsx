/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import { useParams } from 'react-router';

import { cva } from 'class-variance-authority';

import { TrendingFlatIcon, TrendingUpIcon, TrendingDownIcon } from 'components/Shared/Icons';
import { Card, CardContent } from '../ui/card';

import styles from './Scorecard.module.css';

/**
 * @typedef {"up" | "down" | "no"} ChangeDirection
 */

const colorVariants = cva('', {
  variants: {
    changeDirection: {
      up: styles.Success,
      down: styles.Danger,
      no: styles.Warn,
    },
  },
});

/**
 * Renders an icon based on the change direction.
 *
 * @param {Object} props - The component props.
 * @param {ChangeDirection} props.changeDirection - The direction of the change ('up', 'down', 'no').
 * @returns {JSX.Element|null} The icon component for the given change direction.
 */
const ChangeIcon = function ChangeIcon({ changeDirection }) {
  const iconProps = {
    size: 16,
    className: colorVariants({ changeDirection }),
  };

  switch (changeDirection) {
    case 'up':
      return <TrendingUpIcon {...iconProps} />;
    case 'down':
      return <TrendingDownIcon {...iconProps} />;
    case 'no':
      return <TrendingFlatIcon {...iconProps} />;
    default:
      return null;
  }
};

/**
 * @typedef {Object} DefaultVariantScorecardProps
 * @property {"scorecard"} scorecardType
 * @property {string} label
 * @property {number} value
 * @property {number} change
 * @property {ChangeDirection} changeDirection
 *
 * @typedef {Object} DescriptionVariantScorecardProps
 * @property {"description"} scorecardType
 * @property {string} valueLabel
 * @property {string} changeLabel
 */

/**
 * Renders a scorecard component displaying a label, value, and change information.
 *
 * @param {(DefaultVariantScorecardProps | DescriptionVariantScorecardProps)} props - The component props.
 * @returns {JSX.Element} The rendered scorecard component.
 */
const Scorecard = function Scorecard({
  scorecardType = 'scorecard',
  label,
  value,
  change,
  changeDirection,
  valueLabel,
  changeLabel,
}) {
  const { lng } = useParams();

  const isScorecard = scorecardType === 'scorecard';

  const elements = isScorecard ? (
    <>
      <span className={styles.Label}>{label}</span>
      <span className={styles.Value}>{value.toLocaleString(lng)}</span>
      <div className={styles.ChangeDirection}>
        <ChangeIcon changeDirection={changeDirection} />
        <span className={colorVariants({ changeDirection })}>
          {change > 0 ? '+' : ''}
          {change.toLocaleString(lng)}
        </span>
      </div>
    </>
  ) : (
    <>
      <span className={styles.Label} style={{ minHeight: '1.5rem' }} />
      <span className={styles.DescriptionValue}>{valueLabel}</span>
      <span className={styles.DescriptionChangeDirection}>{changeLabel}</span>
    </>
  );

  return (
    <Card padding="sm" className={styles.Scorecard}>
      <CardContent className={styles.Content}>{elements}</CardContent>
    </Card>
  );
};

export default Scorecard;
