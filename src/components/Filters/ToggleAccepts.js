import ToggleGroup from 'components/Shared/ToggleGroup';
import { IconToggleButton } from './Shared';

import { useFilter } from 'context/filterContext';

function withToggleGroup(Component) {
  const ToggleAccepts = props => {
    const { accept, setAccept } = useFilter();

    const injectedProps = {
      ...props,
      value: accept,
      setValue: setAccept,
      sx: { gridArea: 'accepts' },
    };

    return (
      <Component {...injectedProps}>
        <IconToggleButton
          value="y"
          aria-label="accepts"
          accept={accept}
          text="sprejema"
          iconNames={['CheckWhite', 'Check']}
        />
        <IconToggleButton
          value="n"
          aria-label="rejects"
          accept={accept}
          text="ne sprejema"
          iconNames={['BanWhite', 'Ban']}
        />
        <IconToggleButton
          value="vsi"
          aria-label="all"
          accept={accept}
          text="vsi"
          iconNames={['AllWhite', 'All']}
        />
      </Component>
    );
  };

  return ToggleAccepts;
}

export default withToggleGroup(ToggleGroup);
