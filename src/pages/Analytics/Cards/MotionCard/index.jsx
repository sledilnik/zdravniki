import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { byAgeGroupAndYearMap } from '../../data/data';

import MotionCardHighMap from './MotionCardHighMap';

const MotionCard = function MotionCard() {
  const ageGroups = Array.from(byAgeGroupAndYearMap.keys());
  return (
    <Card>
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
