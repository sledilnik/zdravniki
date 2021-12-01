import Chip from '@mui/material/Chip';

const ChipBaseSmall = function (props) {
  return <Chip {...props} size="small" />;
};
const ChipSmallFilled = function (props) {
  return <ChipBaseSmall {...props} variant="filled" />;
};
const ChipSmallOutlined = function (props) {
  return <ChipBaseSmall {...props} variant="outlined" />;
};

export const Info = function ({ text, ...props }) {
  return <ChipBaseSmall {...props} label={text} color="info" />;
};
export const Success = function ({ text, ...props }) {
  return <ChipBaseSmall {...props} label={text} color="success" />;
};
export const Error = function ({ text, ...props }) {
  return <ChipBaseSmall {...props} label={text} color="error" />;
};

export const Accepts = function ({ text, accept, ...props }) {
  return accept ? <Success {...props} text={text} /> : <Error {...props} text={text} />;
};

export const Outlined = ChipSmallOutlined;

export const OutlinedInfo = function ({ text, ...props }) {
  return (
    <ChipSmallOutlined
      {...props}
      label={text}
      sx={{ color: 'info.main', bgcolor: 'info.contrastText' }}
    />
  );
};

export const FilledError = function ({ text, ...props }) {
  return (
    <ChipSmallFilled
      {...props}
      label={text}
      sx={{ color: 'error.dark', bgcolor: 'error.contrastText' }}
    />
  );
};
export const FilledSuccess = function ({ text, ...props }) {
  return (
    <ChipSmallFilled
      {...props}
      label={text}
      variant="filled"
      sx={{ color: 'success.dark', bgcolor: 'success.contrastText' }}
    />
  );
};

export const FilledAccepts = function ({ text, accept, ...props }) {
  return accept ? <FilledSuccess {...props} text={text} /> : <FilledError {...props} text={text} />;
};
