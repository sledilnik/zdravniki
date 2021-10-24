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
