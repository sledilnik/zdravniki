import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';

const ChipBaseSmall = function ChipBaseSmall(props) {
  return <Chip {...props} size="small" />;
};
const ChipSmallFilled = function ChipSmallFilled(props) {
  return <ChipBaseSmall {...props} variant="filled" />;
};
const ChipSmallOutlined = function ChipSmallOutlined(props) {
  return <ChipBaseSmall {...props} variant="outlined" />;
};

export const Info = function Info({ text, ...props }) {
  return <ChipBaseSmall {...props} label={text} color="info" />;
};
Info.propTypes = {
  text: PropTypes.string.isRequired,
};

export const Success = function Success({ text, ...props }) {
  return <ChipBaseSmall {...props} label={text} color="success" />;
};
Success.propTypes = {
  text: PropTypes.string.isRequired,
};

export const Error = function Error({ text, ...props }) {
  return <ChipBaseSmall {...props} label={text} color="error" />;
};
Error.propTypes = {
  text: PropTypes.string.isRequired,
};

export const Accepts = function Accepts({ text, accept, ...props }) {
  return accept ? <Success {...props} text={text} /> : <Error {...props} text={text} />;
};
Accepts.propTypes = {
  text: PropTypes.string.isRequired,
  accept: PropTypes.bool.isRequired,
};

export const Outlined = ChipSmallOutlined;

export const OutlinedInfo = function OutlinedInfo({ text, ...props }) {
  return (
    <ChipSmallOutlined
      {...props}
      label={text}
      sx={{ color: 'info.main', bgcolor: 'info.contrastText' }}
    />
  );
};
OutlinedInfo.propTypes = {
  text: PropTypes.string.isRequired,
};

export const FilledError = function FilledError({ text, ...props }) {
  return (
    <ChipSmallFilled
      {...props}
      label={text}
      sx={{ color: 'error.dark', bgcolor: 'error.contrastText' }}
    />
  );
};
FilledError.propTypes = {
  text: PropTypes.string.isRequired,
};

export const FilledSuccess = function FilledSuccess({ text, ...props }) {
  return (
    <ChipSmallFilled
      {...props}
      label={text}
      variant="filled"
      sx={{ color: 'success.dark', bgcolor: 'success.contrastText' }}
    />
  );
};
FilledSuccess.propTypes = {
  text: PropTypes.string.isRequired,
};

export const FilledAccepts = function FilledAccepts({ text, accept, ...props }) {
  return accept ? <FilledSuccess {...props} text={text} /> : <FilledError {...props} text={text} />;
};
FilledAccepts.propTypes = {
  text: PropTypes.string.isRequired,
  accept: PropTypes.bool.isRequired,
};
