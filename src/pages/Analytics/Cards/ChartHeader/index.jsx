/* eslint-disable react/prop-types */
/** @import * as CustomPopoverTypes from '../../types' */

import * as Icons from 'components/Shared/Icons';
import Popover from 'pages/Analytics/CustomPopover';

import stylesIconButton from '../../IconButton.module.css';
import { CardHeader, CardSubtitle, CardTitle } from '../CardHeader';

/**
 * @component
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.subtitle
 * @param {CustomPopoverTypes.PopoverCustomOption[]} props.popoverOptions
 * @returns
 */
const ChartHeader = function ChartHeader({ title, subtitle, popoverOptions }) {
  const showPopover = popoverOptions?.length && popoverOptions.length > 0;
  return (
    <CardHeader>
      <div>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
      </div>

      {showPopover ? (
        <Popover
          placement="bottom-start"
          triggerClassname={stylesIconButton.IconButton}
          options={popoverOptions}
        >
          <Icons.Icon name="VerticalDots" aria-label="more actions" />
        </Popover>
      ) : null}
    </CardHeader>
  );
};

export default ChartHeader;
