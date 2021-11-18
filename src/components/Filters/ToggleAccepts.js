import ToggleButton from '@mui/material/ToggleButton';

import ToggleGroup from 'components/Shared/ToggleGroup';
import { Icon } from './styles/Icon';

import { useFilter } from 'context/filterContext';

function withToggleGroup(Component) {
  const ToggleAccepts = props => {
    const { accept, setAccept } = useFilter();

    const injectedProps = {
      ...props,
      value: accept,
      setValue: setAccept,
    };

    return (
      <Component {...injectedProps}>
        <ToggleButton value="y" aria-label="accepts">
          {accept === 'y' ? <Icon name="CheckWhite" /> : <Icon name="Check" />}
          sprejema
        </ToggleButton>
        <ToggleButton value="n" aria-label="rejects">
          {accept === 'n' ? <Icon name="BanWhite" /> : <Icon name="Ban" />}
          ne sprejema
        </ToggleButton>
        <ToggleButton value="vsi" aria-label="all">
          {accept === 'vsi' ? <Icon name="AllWhite" /> : <Icon name="All" />}
          Vsi
        </ToggleButton>
      </Component>
    );
  };

  return ToggleAccepts;
}

export default withToggleGroup(ToggleGroup);
