import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMoreButton = styled(({ expand, ...other }) => <IconButton {...other} />)(
  ({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }),
);

const ExpandMore = function ({ expand, ...other }) {
  return (
    <ExpandMoreButton expand={expand} {...other}>
      <ExpandMoreIcon />
    </ExpandMoreButton>
  );
};

export default ExpandMore;
