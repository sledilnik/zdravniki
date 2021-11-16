import Chip from '@mui/material/Chip';

const ChipBaseSmall = props => <Chip {...props} size="small" />;
const ChipSmallFilled = props => <ChipBaseSmall {...props} variant="filled" />;
const ChipSmallOutlined = props => <ChipBaseSmall {...props} variant="outlined" />;

export const Info = ({ text, ...props }) => <ChipBaseSmall {...props} label={text} color="info" />;
export const Success = ({ text, ...props }) => (
  <ChipBaseSmall {...props} label={text} color="success" />
);
export const Error = ({ text, ...props }) => (
  <ChipBaseSmall {...props} label={text} color="error" />
);

export const Accepts = ({ text, accept, ...props }) =>
  accept ? <Success {...props} text={text} /> : <Error {...props} text={text} />;

export const Outlined = ChipSmallOutlined;

    label={text}
export const FilledError = ({ text, ...props }) => (
  <ChipSmallFilled
    {...props}
    label={text}
    sx={{ color: 'error.dark', bgcolor: 'error.contrastText' }}
  />
);
export const FilledSuccess = ({ text, ...props }) => (
  <ChipSmallFilled
    {...props}
    label={text}
    variant="filled"
    sx={{ color: 'success.dark', bgcolor: 'success.contrastText' }}
  />
);

export const FilledAccepts = ({ text, accept, ...props }) =>
  accept ? <FilledSuccess {...props} text={text} /> : <FilledError {...props} text={text} />;
