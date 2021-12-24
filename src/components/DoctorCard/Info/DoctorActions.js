import { useState } from 'react';
import PropTypes from 'prop-types';

import { CardActions, Divider, IconButton, ListItemIcon, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useTranslation } from 'react-i18next';

import * as Icons from 'components/Shared/Icons';

import * as Styled from '../styles';
import * as Shared from '../Shared';

const DoctorActions = function DoctorActions({ handlers, pathProps, isMarker, phoneNum }) {
  const { t } = useTranslation();

  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const moreMenuOpen = Boolean(moreMenuAnchorEl);
  const moreMenuHandleClick = event => {
    setMoreMenuAnchorEl(event.currentTarget);
  };
  const moreMenuHandleClose = () => {
    setMoreMenuAnchorEl(null);
  };

  const { handleZoom, handleDoctorCard } = handlers;

  const { drPath, slug, path } = pathProps;

  return (
    <CardActions>
      <div>
        <IconButton
          aria-label={t('doctorCard.more')}
          aria-controls={`dr-menu--${drPath}-${slug}`}
          aria-expanded={moreMenuOpen ? 'true' : undefined}
          aria-haspopup="true"
          onClick={moreMenuHandleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Styled.MoreMenu
          id={`dr-menu--${drPath}-${slug}`}
          anchorEl={moreMenuAnchorEl}
          onClose={moreMenuHandleClose}
          open={moreMenuOpen}
        >
          {!isMarker && (
            <MenuItem
              onClick={() => {
                handleZoom();
                moreMenuHandleClose();
              }}
            >
              <ListItemIcon>
                <Icons.Icon name="MapMarker" />
              </ListItemIcon>
              {t('doctorCard.showOnMap')}
            </MenuItem>
          )}
          <MenuItem
            onClick={e => {
              moreMenuHandleClose();
              handleDoctorCard(e, true);
            }}
          >
            <ListItemIcon>
              <Icons.Icon name="ReportError" />
            </ListItemIcon>
            {t('reportError.tooltip')}
          </MenuItem>

          {path && <Divider />}
          {path && (
            <MenuItem
              href={path}
              onClick={e => {
                moreMenuHandleClose();
                handleDoctorCard(e, false);
              }}
            >
              <Shared.LinkNoRel href={path} onClick={e => handleDoctorCard(e, false)}>
                <ListItemIcon>
                  <Icons.Icon name="IdCard" />
                </ListItemIcon>
                {t('doctorCard.more')}
              </Shared.LinkNoRel>
            </MenuItem>
          )}
        </Styled.MoreMenu>
        <Shared.PhoneButton phone={phoneNum} />
      </div>
    </CardActions>
  );
};

DoctorActions.defaultProps = {
  isMarker: false,
};

DoctorActions.propTypes = {
  isMarker: PropTypes.bool,
  handlers: PropTypes.shape({
    handleZoom: PropTypes.func,
    handleDoctorCard: PropTypes.func,
  }).isRequired,
  pathProps: PropTypes.shape({
    path: PropTypes.string,
    drPath: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
  phoneNum: PropTypes.string.isRequired,
};
export default DoctorActions;
