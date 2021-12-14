import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import * as Styled from './styles';

export const TextareaEdit = function TextareaEdit({ name, value, setValue, placeholder }) {
  const [editingValue, setEditingValue] = useState(value);

  const onChange = event => setEditingValue(event.target.value);

  const onKeyDown = event => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur();
    }
  };

  const onBlur = event => {
    if (event.target.value.trim() === '') {
      setEditingValue(value);
    } else {
      setValue(event.target.value);
    }
  };

  const textareaRef = useRef();
  const height = textareaRef.current?.scrollHeight;

  useEffect(() => {
    // this is not perfect but it will do for now; most likely design will change
    const lineHeight = height > 25 ? 17 : 25;
    const rows = height ? Math.floor(height / lineHeight) : 1;
    textareaRef.current.rows = rows;
  }, [height]);

  return (
    <Styled.InlineEdit.Textarea
      rows={1}
      aria-label={name}
      name={name}
      value={editingValue}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      ref={textareaRef}
      placeholder={placeholder}
    />
  );
};

export const SelectEdit = function SelectEdit({ name, value, setValue }) {
  const { t } = useTranslation();

  const values = [
    // csv file has values "y" and "n"
    { k: 'n', v: t('rejects').toUpperCase() },
    { k: 'y', v: t('accepts').toUpperCase() },
  ];

  const [editingValue, setEditingValue] = useState(value);

  const onChange = event => setEditingValue(event.target.value);

  const onKeyDown = event => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur();
    }
  };

  const onBlur = event => {
    if (event.target.value.trim() === '') {
      setEditingValue(value);
    } else {
      setValue(event.target.value);
    }
  };

  return (
    <Styled.InlineEdit.Select
      type="text"
      aria-label={name}
      name={name}
      value={editingValue}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
    >
      {values.map(({ k, v }) => (
        <option key={k} value={k}>
          {v}
        </option>
      ))}
    </Styled.InlineEdit.Select>
  );
};

TextareaEdit.defaultProps = {
  placeholder: 'placeholder',
};

TextareaEdit.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SelectEdit.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};
