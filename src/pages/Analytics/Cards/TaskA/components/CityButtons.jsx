import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import { Icon } from 'components/Shared/Icons';
import { srOnly } from 'pages/Analytics/highcharts-options/options';
import { Button } from '../Buttons';
import { CITY_MUNICIPALITIES_LIST, assertSetsEqual } from '../constants';
import styles from '../Buttons.module.css';

export function CityButtons({ municipalities, setFilterState }) {
  const tCommon = t('analytics.common', { returnObjects: true });
  const citiesButtonRef = useRef(null);
  const allCitiesButtonRef = useRef(null);

  useEffect(() => {
    const button = citiesButtonRef.current;
    const allButton = allCitiesButtonRef.current;
    if (!button || !allButton) return;

    const isCitiesActive = assertSetsEqual(
      new Set(municipalities),
      new Set(CITY_MUNICIPALITIES_LIST),
    );
    button.setAttribute('data-state', isCitiesActive ? 'active' : 'inactive');
    button.style.pointerEvents = isCitiesActive ? 'none' : 'auto';

    const isAllCitiesActive = municipalities.length === 0;
    allButton.setAttribute('data-state', isAllCitiesActive ? 'active' : 'inactive');
    allButton.style.pointerEvents = isAllCitiesActive ? 'none' : 'auto';
  }, [municipalities]);

  const handleAllCitiesClick = () => {
    if (!allCitiesButtonRef.current) return;

    const prevDataState = allCitiesButtonRef.current.getAttribute('data-state');
    if (prevDataState === 'active') return;

    allCitiesButtonRef.current.setAttribute('data-state', 'active');
    setFilterState('municipalities', []);
  };

  const handleCityMunicipalitiesClick = () => {
    if (!citiesButtonRef.current) return;

    const prevDataState = citiesButtonRef.current.getAttribute('data-state');
    citiesButtonRef.current.setAttribute(
      'data-state',
      prevDataState === 'inactive' ? 'active' : 'inactive',
    );
    setFilterState('municipalities', prevDataState === 'inactive' ? CITY_MUNICIPALITIES_LIST : []);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button
        ref={allCitiesButtonRef}
        type="button"
        data-state="active"
        onClick={handleAllCitiesClick}
      >
        Cela Slovenija
      </Button>
      <Button
        ref={citiesButtonRef}
        type="button"
        onClick={handleCityMunicipalitiesClick}
        data-state="inactive"
      >
        {citiesButtonRef.current?.getAttribute('data-state') === 'inactive'
          ? tCommon.buttons.cityMunicipalitiesInactive
          : tCommon.buttons.cityMunicipalitiesActive}
      </Button>
      {municipalities.map(municipality => (
        <label key={municipality} className={styles.MunicipalityCheckbox}>
          <input
            style={srOnly}
            type="checkbox"
            value={municipality}
            checked
            onChange={e => {
              setFilterState(
                'municipalities',
                municipalities.filter(m => m !== e.target.value),
              );
            }}
          />
          {municipality} <Icon name="Close" width="0.5rem" height="0.5rem" />
        </label>
      ))}
    </div>
  );
}

CityButtons.propTypes = {
  municipalities: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilterState: PropTypes.func.isRequired,
};
