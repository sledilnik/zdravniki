import { Icon } from 'components/Shared/Icons';
import { getIsRequestFullscreenSupported } from 'utils';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import styles from '../../Cards/Cards.module.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const ChartActions = function ChartActions({ actions }) {
  const { openFullScreen, printChart, handleCsvDownload, handleJsonDownload } = actions;

  const isRequestFullscreenSupported = getIsRequestFullscreenSupported(document.documentElement);

  const tCommonButtons = t('analytics.common.buttons', { returnObjects: true });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label="Options" className={styles.IconButton}>
          <Icon name="VerticalDots" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{tCommonButtons.menu}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isRequestFullscreenSupported ? (
          <DropdownMenuItem asChild>
            <button type="button" onClick={openFullScreen} style={{ width: '100%' }}>
              {tCommonButtons.fullScreen}
            </button>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem asChild>
          <button type="button" onClick={printChart} style={{ width: '100%' }}>
            {tCommonButtons.print}
          </button>
        </DropdownMenuItem>
        {!!handleCsvDownload || !!handleJsonDownload ? (
          <DropdownMenuGroup>
            <DropdownMenuLabel>{tCommonButtons.export}</DropdownMenuLabel>
            {handleCsvDownload ? (
              <DropdownMenuItem asChild>
                <button type="button" onClick={handleCsvDownload} style={{ width: '100%' }}>
                  CSV
                </button>
              </DropdownMenuItem>
            ) : null}
            {handleJsonDownload ? (
              <DropdownMenuItem asChild>
                <button type="button" onClick={handleJsonDownload} style={{ width: '100%' }}>
                  JSON
                </button>
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuGroup>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
ChartActions.propTypes = {
  actions: PropTypes.shape({
    openFullScreen: PropTypes.func.isRequired,
    printChart: PropTypes.func.isRequired,
    handleCsvDownload: PropTypes.func,
    handleJsonDownload: PropTypes.func,
  }).isRequired,
};

export default ChartActions;
