/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { byAgeGroupAndYearMap } from 'pages/Analytics/data/fake-data';

import MotionCardHighMap from './MotionCardHighMap';

/**
 * @param {Object} props
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the chart.
 * @param {React.ComponentProps<"article">["className"]} props.className - The class name for the chart. Defaults to an empty string.
 * @returns {JSX.Element} The rendered RichInfoClick component.
 */
const MotionCard = function MotionCard({ id, className = '' }) {
  const ageGroups = Array.from(byAgeGroupAndYearMap.keys());
  return (
    <Card as="article" id={id} className={className}>
      <CardHeader>
        <CardTitle>Motion Card</CardTitle>
      </CardHeader>
      {ageGroups.map(ageGroup => (
        <CardContent key={ageGroup}>
          <CardTitle>{ageGroup}</CardTitle>
          <MotionCardHighMap data={byAgeGroupAndYearMap.get(ageGroup)} ageGroup={ageGroup} />
        </CardContent>
      ))}
    </Card>
  );
};

export default MotionCard;
