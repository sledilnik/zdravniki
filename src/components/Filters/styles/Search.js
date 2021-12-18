import { styled } from '@mui/material/styles';
import MuiInputBase from '@mui/material/InputBase';
import MuiTextField from '@mui/material/TextField';
import MuiBox from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '25px',
  backgroundColor: 'transparent',
  width: '100%',
  height: '48px',

  '&:focus-within': {
    color: theme.customColors.dark,
    boxShadow: '0 0 7px 0 rgba(9,175,218,0.76)',
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const InputBase = styled(MuiInputBase)(({ theme }) => {
  // ios 16/14 = 1.14285714286, 14/16 = 0.875
  const scaleUpRatio = 1.14285714286;
  const scaleDownRatio = 0.875;

  const height = `${48 * scaleUpRatio}px`;
  const paddingBlock = 0;
  const paddingRight = `${8 * scaleUpRatio}px`;
  const paddingLeft = `${(16 + 32) * scaleUpRatio}px`; // before `calc(1em + ${theme.spacing(4)})`,
  const borderRadius = `${25 * scaleUpRatio}px`;
  const border = `${scaleUpRatio}px solid ${theme.customColors.borderLight}`;
  const width = `${100 * scaleUpRatio}%`;

  const transform = `scale(${scaleDownRatio})`;

  return {
    color: 'inherit',
    width,
    '& .MuiInputBase-input': {
      fontWeight: 600,
      letterSpacing: 0,
      fontSize: '16px',
      height,
      paddingBlock,
      paddingRight,
      // vertical padding + font size from searchIcon
      paddingLeft,
      width,
      borderRadius,
      border,

      /* scale down by 14/16 = 87,5% */
      transform,
      transformOrigin: 'left top',

      input: {
        '&::placeholder': { fontSize: '14px' },
      },
    },
  };
});

export const TextField = styled(MuiTextField)({
  '& .MuiOutlinedInput-root': {
    paddingBlock: '2px',
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: 0,
    borderRadius: '25px',
    '& fieldset': { border: 'none' },
    '&:hover fieldset': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    '&.Mui-focused fieldset': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
});

export const SearchBox = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,

  gridArea: 'search',

  width: '150px',
  height: '48px',

  margin: '0 12px 0 0',
  border: 'none',
  borderRadius: '25px',
  background: '#fff',

  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },

  [theme.breakpoints.up('md')]: {
    margin: 0,
    width: '400px',
  },
}));

export const SearchPaper = styled(MuiPaper)(({ theme }) => ({
  color: theme.customColors.dark,
  background: 'transparent',
  borderRadius: '25px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}));
