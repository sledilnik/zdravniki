import { t } from 'i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Styled from './styles';

export const TextareaEdit = function TextareaEdit({ name, value, setValue }) {
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

  const onInput = useCallback(target => {
    if (target.scrollHeight > 33) {
      // target.style.height = '5px';
      // target.style.height = `${target.scrollHeight - 16}px`;
    }
  }, []);

  const textareaRef = useRef();

  useEffect(() => {
    onInput(textareaRef.current);
  }, [onInput, textareaRef]);

  return (
    <Styled.InlineEdit.Textarea
      rows={1}
      aria-label={name}
      name={name}
      value={editingValue}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onInput={event => onInput(event.target)}
      ref={textareaRef}
    />
  );
};

export const SelectEdit = function SelectEdit({ name, value, setValue }) {
  const values = [
    { k: 0, v: t('rejects').toUpperCase() },
    { k: 1, v: t('accepts').toUpperCase() },
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
        <option key={k} value={v}>
          {v}
        </option>
      ))}
    </Styled.InlineEdit.Select>
  );
};
