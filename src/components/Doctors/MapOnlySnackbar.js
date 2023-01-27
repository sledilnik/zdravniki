import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { t } from 'i18next';

import { styled } from '@mui/material/styles';

import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Snackbar = styled(MuiSnackbar)(({ theme }) => ({
  '&.MuiSnackbar-anchorOriginTopCenter': {
    top: '96px',
  },

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const Alert = forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAlert elevation={6} ref={ref} {...props} />
));

const MapOnlySnackbar = function MapOnlySnackbar({ noResults }) {
  const [open, setOpen] = useState(noResults);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!noResults) {
      setOpen(false);
    }

    if (noResults) {
      setOpen(true);
    }
  }, [noResults]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
        {t('noResults')}
      </Alert>
    </Snackbar>
  );
};

MapOnlySnackbar.propTypes = {
  noResults: PropTypes.bool.isRequired,
};
export default MapOnlySnackbar;
