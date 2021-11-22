import ToggleGroup from 'components/Shared/ToggleGroup';

import { useFilter } from 'context/filterContext';
import { useEffect, useState } from 'react';
import { IconToggleButton } from './Shared';

function withToggleGroup(Component) {
  const ToggleDoctorType = props => {
    const { doctorType, setDoctorType } = useFilter();
    const [drType, setDrType] = useState('gp');
    const [ageGroup, setAgeGroup] = useState('adults');

    const injectedPropsDrType = {
      ...props,
      value: drType,
      setValue: setDrType,
    };
    const injectedPropsAgeGroup = {
      ...props,
      value: ageGroup,
      setValue: setAgeGroup,
    };

    useEffect(() => {
      const TypeTranslate = {
        gp_adults: 'gp',
        gp_youth: 'gp-y',
        gp_students: 'gp',
        den_adults: 'den',
        den_students: 'den-s',
        den_youth: 'den-y',
        gyn_adults: 'gyn',
        gyn_students: 'gyn',
        gyn_youth: 'gyn',
      };

      const _doctorType = `${drType}_${ageGroup}`;

      if (!TypeTranslate[_doctorType]) {
        setAgeGroup('adults');
      }

      doctorType !== _doctorType && setDoctorType(TypeTranslate[_doctorType]);
    }, [drType, ageGroup, doctorType, setDoctorType]);

    return (
      <>
        <Component {...injectedPropsDrType}>
          <IconToggleButton
            value="gp"
            aria-label="general practitioner"
            accept={drType}
            text="splošni"
            iconNames={['FamilyDrWhite', 'Family']}
          />
          <IconToggleButton
            value="den"
            aria-label="dentist"
            accept={drType}
            text="zobozdravnik"
            iconNames={['DentistWhite', 'Dentist']}
          />
          <IconToggleButton
            value="gyn"
            aria-label="gynecologist"
            accept={drType}
            text="ginekolog"
            iconNames={['GynoWhite', 'Gyno']}
          />
        </Component>
        {drType !== 'gyn' && (
          <Component {...injectedPropsAgeGroup}>
            <IconToggleButton
              value="adults"
              aria-label="adults"
              accept={ageGroup}
              text="odrasli"
              iconNames={['CheckWhite', 'Ban']}
            />
            {drType === 'den' && (
              <IconToggleButton
                value="students"
                aria-label="students"
                accept={ageGroup}
                text="študenti"
                iconNames={['CheckWhite', 'Ban']}
              />
            )}
            <IconToggleButton
              value="youth"
              aria-label="youth"
              accept={ageGroup}
              text="mladina"
              iconNames={['CheckWhite', 'Ban']}
            />
          </Component>
        )}
      </>
    );
  };

  return ToggleDoctorType;
}

export default withToggleGroup(ToggleGroup);
