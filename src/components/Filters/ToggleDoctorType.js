import ToggleButton from '@mui/material/ToggleButton';

import ToggleGroup from 'components/Shared/ToggleGroup';
import { Icon } from './styles/Icon';

import { useFilter } from 'context/filterContext';
import { useEffect, useState } from 'react';

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
        den_adults: 'den',
        den_students: 'den-s',
        den_youth: 'den-y',
        gyn: 'gyn',
      };

      const _doctorType = `${drType}_${ageGroup}`;

      doctorType !== _doctorType && setDoctorType(TypeTranslate[_doctorType]);
    }, [drType, ageGroup, doctorType, setDoctorType]);

    return (
      <>
        <Component {...injectedPropsDrType}>
          <ToggleButton value="gp" aria-label="general practitioner">
            {drType === 'gp' ? <Icon name="FamilyDrWhite" /> : <Icon name="Family" />}
            splošni
          </ToggleButton>
          <ToggleButton value="den" aria-label="dentist">
            {drType === 'den' ? <Icon name="DentistWhite" /> : <Icon name="Dentist" />}
            zobozdravnik
          </ToggleButton>
          <ToggleButton value="gyn" aria-label="gynecologist">
            {drType === 'gyn' ? <Icon name="GynoWhite" /> : <Icon name="Gyno" />}
            ginekolog
          </ToggleButton>
        </Component>
        {drType !== 'gyn' && (
          <Component {...injectedPropsAgeGroup}>
            <ToggleButton value="adults" aria-label="adults">
              odrasli
            </ToggleButton>
            {drType === 'den' && (
              <ToggleButton value="students" aria-label="students">
                študenti
              </ToggleButton>
            )}
            <ToggleButton value="youth" aria-label="youth">
              mladina
            </ToggleButton>
          </Component>
        )}
      </>
    );
  };

  return ToggleDoctorType;
}

export default withToggleGroup(ToggleGroup);
