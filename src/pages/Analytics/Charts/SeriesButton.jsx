/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

/**
 * SeriesButton component renders a button that toggles its visibility state and triggers an onClick event.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.onClick - The function to call when the button is clicked.
 * @param {boolean} props.visible - The initial visibility state of the button.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {string} [props.className=''] - Additional CSS class names to apply to the button.
 * @param {string} [props.color='inherit'] - The color of the button text.
 *
 * @returns {JSX.Element} The rendered button component.
 */
const SeriesButton = function SeriesButton({
  onClick,
  visible,
  children,
  className = '',
  color = 'inherit',
  borderColor = 'inherit',
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(visible);

  const onNeki = () => {
    setIsVisible(!isVisible);
    onClick();
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onNeki}
      className={className}
      data-visible={isVisible}
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
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  className: PropTypes.string,
};

export default SeriesButton;
