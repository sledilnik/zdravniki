import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Icon } from '../styles/Icon';
import { ChildrenPropType, StylePropType } from '../../../types';

export const Text = function Text({ children, show }) {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: 'inherit',
        fontWeight: 'inherit',
        display: { xs: show ? 'inline-flex' : 'none', lg: 'inline-flex' },
      }}
    >
      {children}
    </Typography>
  );
};
Text.propTypes = {
  show: PropTypes.bool.isRequired,
  children: ChildrenPropType,
};

Text.defaultProps = {
  children: undefined,
};

export const TextAlways = function TextAlways({ children, show }) {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: 'inherit',
        fontWeight: 'inherit',
        display: { sm: show ? 'inline-flex' : 'none', md: 'inline-flex' },
      }}
    >
      {children}
    </Typography>
  );
};

TextAlways.propTypes = {
  show: PropTypes.bool.isRequired,
  children: ChildrenPropType,
};

TextAlways.defaultProps = {
  children: undefined,
};

export const IconToggleButton = function IconToggleButton({
  accept,
  text,
  iconNames = [],
  always = false,
  ...props
}) {
  const show = accept === props.value;

  return (
    <ToggleButton {...props} sx={{ ...props?.sx, gap: text && '5px' }}>
      {show ? <Icon name={iconNames[0]} /> : <Icon name={iconNames[1]} />}
      {always ? <TextAlways show={show}>{text}</TextAlways> : <Text show={show}>{text}</Text>}
    </ToggleButton>
  );
};

IconToggleButton.propTypes = {
  accept: PropTypes.string,
  value: PropTypes.string,
  always: PropTypes.bool,
  text: PropTypes.string,
  sx: StylePropType,
  iconNames: PropTypes.arrayOf(PropTypes.string),
};

IconToggleButton.defaultProps = {
  accept: undefined,
  value: undefined,
  always: false,
  text: undefined,
  sx: undefined,
  iconNames: [],
};
