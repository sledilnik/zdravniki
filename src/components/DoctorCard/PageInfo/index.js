import { useState } from 'react';
import { CardContent, Typography, Tooltip, Stack, Alert } from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import IconButton from '@mui/material/IconButton';
import { useFilter } from 'context/filterContext';
import SingleChart from 'components/Shared/CircleChart';

import * as Icons from 'components/Shared/Icons';
import { MAP } from 'const';

import ReportError from '../ReportError';
import * as Styled from '../styles';
import * as Shared from '../Shared';

import { toPercent } from '../utils';
import { AgeGroupTranslate } from '../dicts';

const PageInfo = function PageInfo({ doctor, isReportError }) {
  const { t } = useTranslation();
  const { searchValue } = useFilter();
  const { state } = useLocation();

  const { lng } = useParams();
  const accepts = doctor.accepts === 'y';

  const [type, ageGroup] = doctor.type.split('-');

  const availabilityText = toPercent(doctor.availability, lng);
  const websiteText = doctor.website && new URL(doctor.website).host;
  const emailText = doctor.email;
  const orderformText = doctor.orderform && t('orderform');

  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate(`/${lng}/`, {
      state: {
        searchValue,
        zoom: state?.zoom ?? MAP.ZOOM,
        center: state?.center ?? MAP.GEO_LOCATION.SL_CENTER,
        type,
        ageGroup: AgeGroupTranslate[ageGroup] ?? 'adults',
      },
    });
  };

  const [isEditing, setIsEditing] = useState(isReportError);
  const [message, setMessage] = useState('');

  const reportError = () => {
    setIsEditing(true);
    setMessage('');
    navigate('edit');
  };

  if (isEditing) {
    const doctorFormData = {
      name: doctor.name,
      instId: doctor.instId,
      provider: doctor.provider,
      fullAddress: doctor.fullAddress,
      website: doctor.website,
      phone: doctor.phone,
      email: doctor.email,
      orderform: doctor.orderform,
      accepts: doctor.accepts,
      availability: doctor.availability,
      type: doctor.type,
      note: '',
    };
    return (
      <ReportError
        doctorFormData={doctorFormData}
        setIsEditing={setIsEditing}
        setMessage={setMessage}
      />
    );
  }

  const phones = doctor.phone?.split(',');

  // todo create component for urls -> website, orderform

  return (
    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <Typography component="h1" variant="h1">
          {doctor.name}
        </Typography>
        <Shared.DoubleChip type={type} ageGroup={ageGroup} />
        <Typography component="h2" variant="h2">
          {doctor.provider}
        </Typography>
        <Typography component="address" variant="body2" sx={{ mb: { xs: 1, sm: 1.5, md: 2 } }}>
          {doctor.fullAddress}
        </Typography>
        {websiteText && (
          <Styled.PageInfo.LinkWrapper direction="row" alignItems="center" spacing={1}>
            <Typography component="div" variant="body1">
              <Icons.Icon name="Link" />
            </Typography>
            <Shared.ConditionalLink to={doctor.website} variant="body1">
              {websiteText}
            </Shared.ConditionalLink>
          </Styled.PageInfo.LinkWrapper>
        )}
        {doctor.phone && <Shared.PageInfoPhones phones={phones} />}
        {emailText && (
          <Styled.PageInfo.LinkWrapper direction="row" alignItems="center" spacing={1}>
            <Typography component="div" variant="body1">
              <Icons.Icon name="Link" />
            </Typography>
            <Shared.ConditionalLink to={`mailto:${emailText}`} variant="body1">
              {emailText}
            </Shared.ConditionalLink>
          </Styled.PageInfo.LinkWrapper>
        )}
        {orderformText && (
          <Styled.PageInfo.LinkWrapper direction="row" alignItems="center" spacing={1}>
            <Typography component="div" variant="body1">
              <Icons.Icon name="Link" />
            </Typography>
            <Shared.ConditionalLink to={doctor.orderform} variant="body1">
              {orderformText}
            </Shared.ConditionalLink>
          </Styled.PageInfo.LinkWrapper>
        )}

        <Stack sx={{ mt: { md: 2 } }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip
              title={
                <Shared.Tooltip.HeadQuotient
                  load={doctor.load}
                  note={doctor.note && <p>{doctor.note}</p>}
                  date={doctor.note && <p>{doctor.formatUpdatedAt(lng)}</p>}
                />
              }
              leaveTouchDelay={3000}
              enterTouchDelay={50}
            >
              <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
                <Shared.Accepts accepts={accepts} />
              </Styled.InfoWrapper>
            </Tooltip>
            <Tooltip
              title={
                <Shared.Tooltip.Availability
                  date={doctor.availabilityOverride && <p>{doctor.formatUpdatedAt(lng)}</p>}
                />
              }
              leaveTouchDelay={3000}
              enterTouchDelay={50}
            >
              <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
                <SingleChart size="26px" percent={doctor.availability} />
                <Styled.Availability variant="caption">{availabilityText}</Styled.Availability>
              </Styled.InfoWrapper>
            </Tooltip>
          </Stack>
        </Stack>

        <Styled.PageInfo.Changed>
          {doctor.updatedAt && `${t('changedOn')}${doctor.formatUpdatedAt(lng)}`}
          {doctor.note && <p>{doctor.note}</p>}
        </Styled.PageInfo.Changed>

        {message && (
          <Alert sx={{ marginTop: '1rem' }} severity="success">
            {message}
          </Alert>
        )}
      </div>
      <div>
        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Styled.PageInfo.BackWrapper direction="row">
            <Stack direction="row" alignItems="center" onClick={handleBackButton}>
              <IconButton sx={{ marginLeft: '-8px' }}>
                <Icons.Icon name="ArrowBack" />
              </IconButton>
              <Typography component="div" variant="body1">
                {t('backToHome')}
              </Typography>
            </Stack>
          </Styled.PageInfo.BackWrapper>
          <Tooltip title={t('reportError.tooltip')}>
            <IconButton
              disabled={message !== ''}
              component="span"
              variant="outlined"
              onClick={reportError}
              size="small"
            >
              <Icons.Icon name="ReportError" />
            </IconButton>
          </Tooltip>
        </Stack>
      </div>
    </CardContent>
  );
};

export default PageInfo;
