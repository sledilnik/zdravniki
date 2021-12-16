import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CardContent, Typography, Stack, Button, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

import slugify from 'slugify';
import * as Shared from '../Shared';
import { SelectEdit, TextareaEdit } from './InlineEdit';
import { toPercent } from '../utils';

const ReportError = function ReportError({ doctorFormData, setIsEditing, setMessage }) {
  const { t } = useTranslation();
  const { lng } = useParams();
  const navigate = useNavigate();

  const accepts = doctorFormData.accepts === 'y';
  const [type, ageGroup] = doctorFormData.type.split('-');
  const availabilityText = toPercent(doctorFormData.availability, lng);

  const drPath = doctorFormData.type;
  const slug = slugify(doctorFormData?.name?.toLowerCase());
  const path = `/${lng}/${drPath}/${slug}`;

  const [inputAddress, setInputAddress] = useState(doctorFormData.fullAddress);
  const [inputAccepts, setInputAccepts] = useState(accepts ? 'y' : 'n');
  const [inputAvailability, setInputAvailability] = useState(availabilityText);
  const [inputPhone, setInputPhone] = useState(doctorFormData.phone);
  const [inputWebsite, setInputWebsite] = useState(doctorFormData.website);
  const [inputNote, setInputNote] = useState(doctorFormData.note);

  const formUrl = `https://docs.google.com/forms/d/${process.env.REACT_APP_GOOGLE_FORM_ID}/formResponse`;

  const formState = {
    inputName: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_NAME,
      value: doctorFormData.name,
    },
    inputUrl: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_URL,
      value: process.env.REACT_APP_URL + path,
    },
    inputType: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_TYPE,
      value: doctorFormData.type,
    },
    inputProvider: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_PROVIDER,
      value: doctorFormData.provider,
    },
    inputFullAddress: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_ADDRESS,
      value: inputAddress,
    },
    inputAccepts: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_ACCEPTS,
      value: inputAccepts,
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
    inputNote: {
      id: process.env.REACT_APP_GOOGLE_FORM_INPUT_NOTE,
      value: inputNote,
    },
  };

  const submit = async e => {
    e.preventDefault();

    // if none of the input data is changed, do not send anything to Google Sheets
    if (
      inputAddress === doctorFormData.fullAddress &&
      inputAccepts === doctorFormData.accepts &&
      inputAvailability === availabilityText &&
      inputWebsite === doctorFormData.website &&
      inputPhone === doctorFormData.phone &&
      inputNote === doctorFormData.note
    ) {
      console.log('not sending anything');
      return;
    }

    // if any input data is not changed, do not send it to Google Sheets
    if (inputAddress === doctorFormData.fullAddress) {
      formState.inputFullAddress.value = '';
    }
    if (inputAccepts === doctorFormData.accepts) {
      formState.inputAccepts.value = '';
    }
    if (inputAvailability === availabilityText) {
      formState.inputAvailability.value = '';
    }
    if (inputWebsite === doctorFormData.website) {
      formState.inputWebsite.value = '';
    }
    if (inputPhone === doctorFormData.phone) {
      formState.inputPhone.value = '';
    }
    if (inputNote === doctorFormData.note) {
      formState.inputNote.value = '';
    }

    const formData = new FormData();
    Object.values(formState).forEach(item => formData.append(`entry.${item.id}`, item.value));

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
    setInputAccepts(accepts.toString());
    setInputAvailability(doctorFormData.availabilityText);
    setInputPhone(doctorFormData.phone);
    setInputWebsite(doctorFormData.website);
    setInputNote(doctorFormData.note);
    navigate(path);
  };

  return (
    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <Typography component="h1" variant="h1">
          {doctorFormData.name}
        </Typography>
        <Shared.DoubleChip type={type} ageGroup={ageGroup} />
        <Typography component="h2" variant="h2">
          {doctorFormData.provider}
        </Typography>
        <Alert severity="info" sx={{ marginY: '1rem' }}>
          {t('reportError.text')}
        </Alert>
        <TextareaEdit
          name="inputAddress"
          value={inputAddress}
          setValue={setInputAddress}
          placeholder={t('reportError.placeholder.address')}
        />
        <TextareaEdit
          name="inputWebsite"
          value={inputWebsite}
          setValue={setInputWebsite}
          placeholder={t('reportError.placeholder.website')}
        />
        <TextareaEdit
          name="inputPhone"
          value={inputPhone}
          setValue={setInputPhone}
          placeholder={t('reportError.placeholder.phone')}
        />
        <SelectEdit name="inputAccepts" value={inputAccepts} setValue={setInputAccepts} />
        <TextareaEdit
          name="inputAvailabilty"
          value={inputAvailability}
          setValue={setInputAvailability}
          placeholder={t('reportError.placeholder.availability')}
        />
        <TextareaEdit
          name="inputNote"
          value={inputNote}
          setValue={setInputNote}
          placeholder={t('reportError.placeholder.note')}
        />
      </div>
      <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={resetForm} sx={{ marginRight: '1rem' }} size="small">
          {t('reportError.cancel')}
        </Button>
        <Button variant="contained" onClick={submit} size="small">
          {t('reportError.send')}
        </Button>
      </Stack>
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
    availability: PropTypes.string,
    type: PropTypes.string,
    note: PropTypes.string,
  }).isRequired,
  setIsEditing: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};
export default ReportError;
