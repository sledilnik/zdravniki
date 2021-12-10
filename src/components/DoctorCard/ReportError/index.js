import { useState } from 'react';
import PropTypes from 'prop-types';
import { CardContent, Typography, Stack, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import map from 'lodash/map';

import { TextareaEdit, SelectEdit } from '../InlineEdit';
import * as Shared from '../Shared';

const ReportError = function ReportError({ doctorFormData, setIsEditing, setMessage }) {
  const { t } = useTranslation();

  const accepts = doctorFormData.accepts === 'y';
  const [type, ageGroup] = doctorFormData.type.split('-');

  const [inputAddress, setInputAddress] = useState(doctorFormData.fullAddress);
  const [inputAvailability, setInputAvailability] = useState(accepts.toString());
  const [inputPhone, setInputPhone] = useState(doctorFormData.phone);
  const [inputWebsite, setInputWebsite] = useState(doctorFormData.website);

  const formUrl = `https://docs.google.com/forms/d/${process.env.REACT_APP_GOOGLE_FORM_ID}/formResponse`;

  const formState = {
    inputName: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_NAME,
      value: doctorFormData.name,
    },
    inputProvider: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_PROVIDER,
      value: doctorFormData.provider,
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

    try {
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
      });
      setMessage(t('reportError.reportReceived'));
    } catch (err) {
      setMessage('Error:', err);
    } finally {
      setIsEditing(false);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setMessage('');
    setInputAddress(doctorFormData.fullAddress);
    setInputAvailability(accepts.toString());
    setInputPhone(doctorFormData.phone);
    setInputWebsite(doctorFormData.website);
  };

  return (
    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Typography component="h1" variant="h1">
        {doctorFormData.name}
      </Typography>
      <Shared.DoubleChip type={type} ageGroup={ageGroup} />
      <Typography component="h2" variant="h2">
        {doctorFormData.provider}
      </Typography>

      <form name="contact-form">
        <TextareaEdit name="inputAddress" value={inputAddress} setValue={setInputAddress} />
        <TextareaEdit name="inputWebsite" value={inputWebsite} setValue={setInputWebsite} />
        <TextareaEdit name="inputPhone" value={inputPhone} setValue={setInputPhone} />
        <Stack sx={{ mt: { md: 2 } }}>
          <SelectEdit
            name="inputAvailability"
            value={inputAvailability}
            setValue={setInputAvailability}
          />
        </Stack>
        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={resetForm} sx={{ marginRight: '1rem' }} size="small">
            {t('reportError.cancel')}
          </Button>
          <Button variant="contained" onClick={submit} size="small">
            {t('reportError.send')}
          </Button>
        </Stack>
      </form>
    </CardContent>
  );
};

ReportError.propTypes = {
  doctorFormData: PropTypes.shape({
    name: PropTypes.string,
    provider: PropTypes.string,
    fullAddress: PropTypes.string,
    website: PropTypes.string,
    phone: PropTypes.string,
    accepts: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  setIsEditing: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};
export default ReportError;
