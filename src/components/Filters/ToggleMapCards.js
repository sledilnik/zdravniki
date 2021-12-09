import ToggleGroup from 'components/Shared/ToggleGroup';

// import { t } from 'i18next';
import { IconToggleButton } from './Shared';

function withToggleGroup(Component) {
  const ToggleAccepts = function ToggleAccepts({ useShow }) {
    const [show, setShow] = useShow();
    const injectedProps = {
      value: show,
      setValue: setShow,
    };

    return (
      <Component {...injectedProps}>
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

  return ToggleAccepts;
}

export default withToggleGroup(ToggleGroup);
