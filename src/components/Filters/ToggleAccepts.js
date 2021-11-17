import ToggleButton from '@mui/material/ToggleButton';

import ToggleGroup from 'components/Shared/ToggleGroup';
import * as Icons from 'components/Shared/Icons';

import { useFilter } from 'context/filterContext';

function withToggleGroup(Component) {
  const ToggleAccepts = () => {
    const { accept, setAccept } = useFilter();

    const injectedProps = {
      value: accept,
      setValue: setAccept,
    };

    return (
      <Component {...injectedProps}>
        <ToggleButton value="y" aria-label="accepts">
          <Icons.CheckIcon />
          sprejema
        </ToggleButton>
        <ToggleButton value="n" aria-label="rejects">
          <Icons.BlockIcon />
          ne sprejema
        </ToggleButton>
        <ToggleButton value="vsi" aria-label="all">
          Vsi
        </ToggleButton>
      </Component>
    );
  };

  return ToggleAccepts;
}

export default withToggleGroup(ToggleGroup);
