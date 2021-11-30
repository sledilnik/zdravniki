import Typography from '@mui/material/Typography';
import * as Styled from '../styles';

export * as Tooltip from './Tooltips';
export const Link = ({ children, ...props }) => (
  <Styled.Link rel="noopener noreferrer" target="_blank" {...props} underline="none">
    {children}
  </Styled.Link>
);
export const ConditionalLink = ({ children, to, component = 'div' }) => {
  return (
    <Typography component={component}>
      {to ? <Link href={to}>{children}</Link> : <>{children}</>}
    </Typography>
  );
};
