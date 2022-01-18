import ToggleGroup from 'components/Shared/ToggleGroup';

import { useFilter } from 'context/filterContext';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { useDoctorTypeExactPath } from 'hooks';

import { IconToggleButton } from './Shared';

function withToggleGroup(Component) {
  return function ToggleDoctorType(props) {
    const { state } = useLocation();
    const { t } = useTranslation();

    const { drType: drTypeFromPath, ageGroup: ageGroupFromPath } = useDoctorTypeExactPath();

    const defaultState = {
      type: drTypeFromPath ?? 'gp',
      ageGroup: ageGroupFromPath ?? 'adults',
    };
    const { type: stateType, ageGroup: stateAgeGroup } = state ?? defaultState;

    const { doctorType, setDoctorType } = useFilter();
    const [drType, setDrType] = useState(stateType ?? 'gp');
    const [ageGroup, setAgeGroup] = useState(stateAgeGroup ?? 'adults');

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
      if (['gp', 'ped', 'gyn'].includes(drType)) {
        setDoctorType(drType);
      }

      if (drType === 'den') {
        const AGE_GROUPS_TRANSLATE = {
          adults: 'den',
          youth: 'den-y',
          students: 'den-s',
        };

        setDoctorType(AGE_GROUPS_TRANSLATE[ageGroup]);
      }
    }, [drType, ageGroup, setDoctorType]);

    useEffect(() => {
      if (['gp', 'ped', 'gyn'].includes(doctorType)) {
        setDrType(doctorType);
        setAgeGroup('adults');
      }

      if (doctorType.includes('ped')) {
        const [drT, ag] = doctorType.split('-');
        setDrType(drT);

        const AGE_GROUPS_TRANSLATE = {
          y: 'youth',
          s: 'students',
        };

        setAgeGroup(AGE_GROUPS_TRANSLATE[ag] ?? 'adults');
      }
    }, [doctorType, setDrType, setAgeGroup]);

    return (
      <>
        <Component {...injectedPropsDrType}>
          <IconToggleButton
            isMainToggle
            value="gp"
            aria-label="general practitioner"
            accept={drType}
            text={t('generalPractitioner')}
            iconNames={['FamilyDrWhite', 'Family']}
          />
          <IconToggleButton
            isMainToggle
            value="ped"
            aria-label="pediatrician"
            accept={drType}
            text={t('pediatrician')}
            iconNames={['KidsWhite', 'Kids']}
          />
          <IconToggleButton
            isMainToggle
            value="gyn"
            aria-label="gynecologist"
            accept={drType}
            text={t('gynecologist')}
            iconNames={['GynoWhite', 'Gyno']}
          />
          <IconToggleButton
            isMainToggle
            value="den"
            aria-label="dentist"
            accept={drType}
            text={t('dentist')}
            iconNames={['DentistWhite', 'Dentist']}
          />
        </Component>
        {drType === 'den' && (
          <Component {...injectedPropsAgeGroup}>
            <IconToggleButton
              value="adults"
              aria-label="adults"
              accept={ageGroup}
              text={t('adults')}
              iconNames={['AdultsWhite', 'Adults']}
            />
            <IconToggleButton
              value="youth"
              aria-label="youth"
              accept={ageGroup}
              text={t('youth')}
              iconNames={['KidsWhite', 'Kids']}
            />
            <IconToggleButton
              value="students"
              aria-label="students"
              accept={ageGroup}
              text={t('students')}
              iconNames={['StudentsWhite', 'Students']}
            />
          </Component>
        )}
      </>
    );
  };
}

export default withToggleGroup(ToggleGroup);
