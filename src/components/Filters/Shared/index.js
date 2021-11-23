import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';
import { Icon } from '../styles/Icon';

export const Text = ({ children, show }) => {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: 'inherit',
        fontWeight: 'inherit',
        display: { xs: 'none', sm: show ? 'inline-flex' : 'none', md: 'inline-flex' },
      }}
    >
      {children}
    </Typography>
  );
};
export const TextAllways = ({ children, show }) => {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: 'inherit',
        fontWeight: 'inherit',
        display: { xs: show ? 'inline-flex' : 'none', md: 'inline-flex' },
      }}
    >
      {children}
    </Typography>
  );
};

export const IconToggleButton = ({ accept, text, iconNames = [], always = false, ...props }) => {
  const show = accept === props.value;

  return (
    <ToggleButton {...props}>
      {show ? <Icon name={iconNames[0]} /> : <Icon name={iconNames[1]} />}
      {always ? <TextAllways show={show}>{text}</TextAllways> : <Text show={show}>{text}</Text>}
    </ToggleButton>
  );
};
