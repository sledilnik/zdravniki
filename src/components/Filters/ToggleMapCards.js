import PropTypes from 'prop-types';
import ToggleGroup from 'components/Shared/ToggleGroup';

// import { t } from 'i18next';
import { IconToggleButton } from './Shared';

function withToggleGroup(Component) {
  const ToggleMapCards = function ToggleMapCards({ useShow }) {
    const [show, setShow] = useShow();

    return (
      <Component value={show} setValue={setShow}>
        <IconToggleButton
          value="map"
          aria-label="map"
          accept={show}
          text="Map"
          iconNames={['CheckWhite', 'Check']}
        />
        <IconToggleButton
          value="cards"
          aria-label="doctor cards"
          accept={show}
          text="Cards"
          iconNames={['BanWhite', 'Ban']}
        />
      </Component>
    );
  };

  ToggleMapCards.propTypes = {
    useShow: PropTypes.func.isRequired,
  };

  return ToggleMapCards;
}

export default withToggleGroup(ToggleGroup);
