import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import slugify from 'slugify';

import { useLeafletContext } from 'context/leafletContext';
import * as Icons from 'components/Shared/Icons';
import SingleChart from 'components/Shared/CircleChart';
import { t } from 'i18next';
import Accepts from './Accepts';
import * as Styled from './styles';
import * as Shared from './Shared';

import { toPercent } from './utils';

const Info = function Info({ doctor, handleZoom = () => {}, isMarker = false }) {
  const { lng } = useParams();
  const { map } = useLeafletContext();
  const accepts = doctor.accepts === 'y';
  const availabilityText = toPercent(doctor.availability, lng);
  const [type, ageGroup] = doctor.type.split('-');

  const navigate = useNavigate();

  const drPath = doctor?.type;
  const slug = slugify(doctor?.name?.toLowerCase());
  let path = `/${lng}/${drPath}/${slug}`;

  const handleDoctorCard = (event, isReportError) => {
    event.preventDefault();
    if (isReportError) {
      path = `/${lng}/${drPath}/${slug}/edit`;
    }
    return navigate(path, { state: { zoom: map?.getZoom(), center: map?.getCenter() } });
  };

  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = React.useState(null);
  const moreMenuOpen = Boolean(moreMenuAnchorEl);
  const moreMenuHandleClick = event => {
    setMoreMenuAnchorEl(event.currentTarget);
  };
  const moreMenuHandleClose = () => {
    setMoreMenuAnchorEl(null);
  };

  return (
    <>
      <CardContent>
        <Typography component="h2" variant="h2">
          <Shared.LinkNoRel href={path} onClick={e => handleDoctorCard(e, false)}>
            {doctor.name}
          </Shared.LinkNoRel>
        </Typography>
        {isMarker && <Shared.DoubleChip type={type} ageGroup={ageGroup} />}
        <Typography component="h3" variant="h3">
          {doctor.provider}
        </Typography>
        <Typography component="address" variant="body2">
          {doctor.fullAddress}
        </Typography>

        <Stack direction={isMarker ? 'column' : 'row'} justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title={<Shared.Tooltip.HeadQuotient load={doctor.load} />}>
              <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
                <Accepts accepts={accepts} />
              </Styled.InfoWrapper>
            </Tooltip>
            <Tooltip title={<Shared.Tooltip.Availability />}>
              <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
                <SingleChart size="26px" percent={doctor.availability} />
                <Stack>
                  <Styled.Availability variant="caption">{availabilityText}</Styled.Availability>
                </Stack>
              </Styled.InfoWrapper>
            </Tooltip>
          </Stack>
        </Stack>
      </CardContent>
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
          {doctor.phone && (
            <Tooltip title={doctor.phone}>
              <IconButton href={`tel:${doctor.phone}`} self>
                <Icons.Icon name="PhoneBig" />
              </IconButton>
            </Tooltip>
          )}
          {!doctor.phone && (
            <Tooltip title={t('doctorCard.noPhone')}>
              <IconButton className="icon--disabled">
                <Icons.Icon name="NoPhoneBig" />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </CardActions>
    </>
  );
};

// todo try React.memo; don't forget about locales
export default Info;
