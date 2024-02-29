import PropTypes from 'prop-types';
import { t } from 'i18next';

import { useEffect, useRef } from 'react';
import * as Styled from './styles';

export const TextareaEdit = function TextareaEdit({
  name,
  value,
  setValue,
  placeholder,
  id,
  label,
  required = undefined,
}) {
  const onChange = event => setValue(event.target.value);
  const onBlur = event => setValue(event.target.value);

  const onKeyDown = event => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur();
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
    <Styled.InlineEdit.Wrapper>
      <Styled.InlineEdit.LabelSrOnly htmlFor={id}>{label || name}</Styled.InlineEdit.LabelSrOnly>
      <Styled.InlineEdit.Textarea
        rows={1}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        ref={textareaRef}
        placeholder={placeholder}
        required={required}
      />
    </Styled.InlineEdit.Wrapper>
  );
};

export const SelectEdit = function SelectEdit({
  name,
  value,
  setValue,
  label,
  id,
  required = undefined,
}) {
  const values = [
    // csv file has values "y" and "n"
    { k: 'n', v: t('rejects').toUpperCase() },
    { k: 'y', v: t('accepts').toUpperCase() },
  ];

  const onChange = event => setValue(event.target.value);
  const onBlur = event => setValue(event.target.value);

  const onKeyDown = event => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur();
    }
  };

  return (
    <Styled.InlineEdit.Wrapper>
      <Styled.InlineEdit.LabelSrOnly htmlFor={id}>{label || name}</Styled.InlineEdit.LabelSrOnly>
      <Styled.InlineEdit.Select
        type="text"
        id={id}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={required}
      >
        {values.map(({ k, v }) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </Styled.InlineEdit.Select>
    </Styled.InlineEdit.Wrapper>
  );
};

TextareaEdit.defaultProps = {
  placeholder: 'placeholder',
  label: '',
  required: undefined,
};

TextareaEdit.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  required: true || undefined,
};

SelectEdit.defaultProps = {
  label: '',
  required: undefined,
};

SelectEdit.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  required: true || undefined,
};
