/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

import styles from './SeriesButton.module.css';

/**
 * SeriesButton component renders a button that toggles its visibility state and triggers an onClick event.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.onClick - The function to call when the button is clicked.
 * @param {Function} [props.onMouseEnter] - The function to call when the mouse enters the button.
 * @param {Function} [props.onMouseLeave] - The function to call when the mouse leaves the button.
 * @param {boolean} props.visible - The initial visibility state of the button.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {string} [props.className=''] - Additional CSS class names to apply to the button.
 * @param {string} [props.color='inherit'] - The color of the button text.
 * @param {string} [props.toggleState] - The button will not toggle state on click; It will keep the visibility state as value of visible prop.
 *
 * @returns {JSX.Element} The rendered button component.
 */
const SeriesButton = function SeriesButton({
  onClick,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  visible = true,
  children,
  className = '',
  color = 'inherit',
  borderColor = 'inherit',
  toggleState = true,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(visible);

  const toggleVisibility = () => {
    if (toggleState) setIsVisible(!isVisible);
    onClick();
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggleVisibility}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${styles.SeriesButton} ${className}`}
      data-visible={toggleState ? isVisible : undefined}
      style={{
        color: isVisible ? color : '#666666',
        borderColor: isVisible ? borderColor : '#666666',
      }}
    >
      {children}
    </button>
  );
};

SeriesButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  className: PropTypes.string,
  toggleState: PropTypes.bool,
};

export default SeriesButton;
