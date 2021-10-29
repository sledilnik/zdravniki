import Chip from '@mui/material/Chip';

export const Success = ({ text }) => {
  return <Chip label={text} size="small" color="success" />;
};
export const Error = ({ text }) => {
  return <Chip label={text} size="small" color="error" />;
};

export const Accepts = ({ text, accept }) => {
  return accept ? <Success text={text} /> : <Error text={text} />;
};

export const FilledError = ({ text }) => {
  return (
    <Chip
      label={text}
      size="small"
      variant="filled"
      sx={{ color: 'error.dark', bgcolor: 'error.contrastText' }}
    />
  );
};
export const FilledSuccess = ({ text }) => {
  return (
    <Chip
      label={text}
      size="small"
      variant="filled"
      sx={{ color: 'success.dark', bgcolor: 'success.contrastText' }}
    />
  );
};

export const FilledAccepts = ({ text, accept }) => {
  return accept ? <FilledSuccess text={text} /> : <FilledError text={text} />;
};
