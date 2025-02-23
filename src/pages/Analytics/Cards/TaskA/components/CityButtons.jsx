import { useRef, useEffect, useCallback } from 'react';
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

  const isCitiesActive = useCallback(
    () => assertSetsEqual(new Set(municipalities), new Set(CITY_MUNICIPALITIES_LIST)),
    [municipalities],
  );

  const isAllCitiesActive = useCallback(() => municipalities.length === 0, [municipalities]);

  const updateButtonState = (button, isActive) => {
    if (!button) return;
    button.setAttribute('data-state', isActive ? 'active' : 'inactive');
    const buttonStyle = button.style;
    buttonStyle.pointerEvents = isActive ? 'none' : 'auto';
  };

  useEffect(() => {
    updateButtonState(citiesButtonRef.current, isCitiesActive());
    updateButtonState(allCitiesButtonRef.current, isAllCitiesActive());
  }, [isAllCitiesActive, isCitiesActive, municipalities]);

  const handleAllCitiesClick = () => {
    if (allCitiesButtonRef.current?.getAttribute('data-state') === 'active') return;
    setFilterState('municipalities', []);
  };

  const handleCityMunicipalitiesClick = () => {
    const isActive = citiesButtonRef.current?.getAttribute('data-state') === 'inactive';
    setFilterState('municipalities', isActive ? CITY_MUNICIPALITIES_LIST : []);
  };

  const handleMunicipalityChange = municipality => {
    setFilterState(
      'municipalities',
      municipalities.filter(m => m !== municipality),
    );
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
            onChange={() => handleMunicipalityChange(municipality)}
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
