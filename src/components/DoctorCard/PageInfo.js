import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContent, Typography, Tooltip, Stack, Button, Alert } from '@mui/material';
import { t } from 'i18next';
import map from 'lodash/map';

import IconButton from '@mui/material/IconButton';
import SingleChart from 'components/Shared/CircleChart';

import * as Icons from 'components/Shared/Icons';
import Accepts from './Accepts';
import * as Styled from './styles';
import * as Shared from './Shared';

import { toPercent } from './utils';
import { TextareaEdit } from './InlineEdit';

const PageInfo = function PageInfo({ doctor }) {
  const lng = localStorage.getItem('i18nextLng') || 'sl';
  const accepts = doctor.accepts === 'y';

  const [type, ageGroup] = doctor.type.split('-');

  const availabilityText = toPercent(doctor.availability, lng);
  const urlText = doctor.website && new URL(doctor.website).host;

  const navigate = useNavigate();
  // todo pass filters' state as second argument
  const handleBackButton = () => {
    navigate(`/${lng}`);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [inputAddress, setInputAddress] = useState(doctor.fullAddress);
  const [inputAvailability, setInputAvailability] = useState(accepts.toString());
  const [inputPhone, setInputPhone] = useState(doctor.phone);
  const [inputWebsite, setInputWebsite] = useState(doctor.website);

  const formUrl = `https://docs.google.com/forms/d/${process.env.REACT_APP_GOOGLE_FORM_ID}/formResponse`;

  const formState = {
    inputName: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_NAME,
      value: doctor.name,
    },
    inputProvider: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_PROVIDER,
      value: doctor.provider,
    },
    inputFullAddress: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_ADDRESS,
      value: inputAddress,
    },
    inputAvailability: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_AVAILABILITY,
      value: inputAvailability,
    },
    inputWebsite: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_WEBSITE,
      value: inputWebsite,
    },
    inputPhone: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_PHONE,
      value: inputPhone,
    },
  };

  const submit = async e => {
    e.preventDefault();

    const formData = new FormData();

    map(formState, item => {
      formData.append(`entry.${item.id}`, item.value);
    });

    await fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'unsafe-url', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: formData, // body data type must match "Content-Type" header
    })
      .then(() => {
        setIsEditing(false);
        setMessage(t('reportError.reportReceived'));
        setTimeout(() => {
          setMessage('');
        }, 5000);
      })
      .catch(err => {
        console.error('err', err);
      });
  };

  const reportError = () => {
    setIsEditing(true);
    setMessage('');
  };

  const resetForm = () => {
    setIsEditing(false);
    setMessage('');
    setInputAddress(doctor.fullAddress);
    setInputAvailability(accepts.toString());
    setInputPhone(doctor.phone);
    setInputWebsite(doctor.website);
  };

  return (
    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <form name="contact-form">
        <Typography component="h1" variant="h1">
          {doctor.name}
        </Typography>
        <Shared.DoubleChip type={type} ageGroup={ageGroup} />
        <Typography component="h2" variant="h2">
          {doctor.provider}
        </Typography>
        <Typography component="address" variant="body2" sx={{ mb: { xs: 1, sm: 1.5, md: 2 } }}>
          {isEditing ? (
            <TextareaEdit name="inputAddress" value={inputAddress} setValue={setInputAddress} />
          ) : (
            doctor.fullAddress
          )}
        </Typography>
        {urlText && (
          <Styled.PageInfo.LinkWrapper direction="row" alignItems="center" spacing={1}>
            <Typography component="div" variant="body1">
              <Icons.Icon name="Link" />
            </Typography>
            {isEditing ? (
              <TextareaEdit name="inputWebsite" value={inputWebsite} setValue={setInputWebsite} />
            ) : (
              <Shared.ConditionalLink to={doctor.website} variant="body1">
                {urlText}
              </Shared.ConditionalLink>
            )}
          </Styled.PageInfo.LinkWrapper>
        )}
        {doctor.phone && (
          <Styled.PageInfo.LinkWrapper direction="row" alignItems="center" spacing={1}>
            <Typography component="div" variant="body1">
              <Icons.Icon name="Phone" />
            </Typography>
            {isEditing ? (
              <TextareaEdit name="inputPhone" value={inputPhone} setValue={setInputPhone} />
            ) : (
              <Shared.ConditionalLink
                to={doctor.phone && `tel:${doctor.phone}`}
                self
                variant="body1"
              >
                {doctor.phone}
              </Shared.ConditionalLink>
            )}
          </Styled.PageInfo.LinkWrapper>
        )}
        <Stack sx={{ mt: { md: 2 } }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            {isEditing ? (
              <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
                <Accepts
                  accepts={inputAvailability}
                  setValue={setInputAvailability}
                  isEditing={isEditing}
                />
              </Styled.InfoWrapper>
            ) : (
              <Tooltip title={<Shared.Tooltip.HeadQuotient load={doctor.load} />}>
                <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
                  <Accepts
                    value={inputAvailability}
                    setValue={setInputAvailability}
                    isEditing={isEditing}
                  />
                </Styled.InfoWrapper>
              </Tooltip>
            )}
            <Tooltip title={<Shared.Tooltip.Availability />}>
              <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
                <SingleChart size="26px" percent={doctor.availability} />
                <Styled.Availability variant="caption">{availabilityText}</Styled.Availability>
              </Styled.InfoWrapper>
            </Tooltip>
          </Stack>
        </Stack>
        {message === '' ? (
          <div />
        ) : (
          <Alert sx={{ marginTop: '1rem' }} severity="success">
            {message}
          </Alert>
        )}
      </form>
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
        {isEditing ? (
          <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={resetForm} sx={{ marginRight: '1rem' }}>
              {t('reportError.cancel')}
            </Button>
            <Button variant="contained" onClick={submit}>
              {t('reportError.send')}
            </Button>
          </Stack>
        ) : (
          <Button
            disabled={message !== ''}
            component="span"
            variant="outlined"
            onClick={reportError}
          >
            {t('reportError.title')}
          </Button>
        )}
      </Stack>
    </CardContent>
  );
};

export default PageInfo;
