import Chip from '@mui/material/Chip';

export const Info = ({ text }) => <Chip label={text} size="small" color="info" />;
export const Success = ({ text }) => <Chip label={text} size="small" color="success" />;
export const Error = ({ text }) => <Chip label={text} size="small" color="error" />;

export const Accepts = ({ text, accept }) =>
  accept ? <Success text={text} /> : <Error text={text} />;

export const FilledError = ({ text }) => (
  <Chip
    label={text}
    size="small"
    variant="filled"
    sx={{ color: 'error.dark', bgcolor: 'error.contrastText' }}
  />
);
export const FilledSuccess = ({ text }) => (
  <Chip
    label={text}
    size="small"
    variant="filled"
    sx={{ color: 'success.dark', bgcolor: 'success.contrastText' }}
  />
);

export const FilledAccepts = ({ text, accept }) =>
  accept ? <FilledSuccess text={text} /> : <FilledError text={text} />;
