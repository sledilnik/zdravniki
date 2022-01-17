import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useDoctorTypeExactPath } from 'hooks';
import { useFilter } from 'context/filterContext';

import ToggleGroup from 'components/Shared/ToggleGroup';

import { IconToggleButton } from './Shared';

function withToggleGroup(Component) {
  const ToggleAccepts = function ToggleAccepts(props) {
    const { accept, setAccept } = useFilter();
    const { t } = useTranslation();

    const { accepts } = useDoctorTypeExactPath();

    const injectedProps = {
      ...props,
      value: accept,
      setValue: setAccept,
      sx: { gridArea: 'accepts' },
    };

    useEffect(() => {
      if (accepts) {
        setAccept(accepts);
      }
    }, [accepts, setAccept]);

    return (
      <Component {...injectedProps}>
        <IconToggleButton
          value="y"
          aria-label="accepts"
          accept={accept}
          text={t('accepts')}
          iconNames={['CheckWhite', 'Check']}
        />
        <IconToggleButton
          value="n"
          aria-label="rejects"
          accept={accept}
          text={t('rejects')}
          iconNames={['BanWhite', 'Ban']}
        />
        <IconToggleButton
          value="vsi"
          aria-label="all"
          accept={accept}
          text={t('all')}
          iconNames={['AllWhite', 'All']}
        />
      </Component>
    );
  };

  return ToggleAccepts;
}

export default withToggleGroup(ToggleGroup);
