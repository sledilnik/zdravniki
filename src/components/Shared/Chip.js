import Chip from '@mui/material/Chip';

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
export const Success = function Success({ text, ...props }) {
  return <ChipBaseSmall {...props} label={text} color="success" />;
};
export const Error = function Error({ text, ...props }) {
  return <ChipBaseSmall {...props} label={text} color="error" />;
};

export const Accepts = function Accepts({ text, accept, ...props }) {
  return accept ? <Success {...props} text={text} /> : <Error {...props} text={text} />;
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

export const FilledError = function FilledError({ text, ...props }) {
  return (
    <ChipSmallFilled
      {...props}
      label={text}
      sx={{ color: 'error.dark', bgcolor: 'error.contrastText' }}
    />
  );
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

export const FilledAccepts = function FilledAccepts({ text, accept, ...props }) {
  return accept ? <FilledSuccess {...props} text={text} /> : <FilledError {...props} text={text} />;
};
