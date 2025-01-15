/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */
/** @typedef {import('react-select').ValueContainerProps} ValueContainerProps */

import { forwardRef } from 'react';

import { cx } from 'class-variance-authority';
import { t } from 'i18next';
import { components } from 'react-select';

import Label from 'pages/Analytics/components/Label';
import CustomReactSelect from 'pages/Analytics/components/Select';

import styles from '../prod/FilterForm.module.css';

/**
 * CustomValueContainer component for react-select
 * Displays "clear all" text when there are selected values and not focused,
 * shows search input when focused or no values selected
 *
 * @param {ValueContainerProps & {text: string, clearAllClassName?: string}} props - Component props from react-select ValueContainerProps
 * @returns {JSX.Element} Rendered value container
 */
export function CustomValueContainer(props) {
  const { children, text, clearAllClassName, ...restProps } = props;

  const { hasValue } = restProps;
  const { menuIsOpen } = restProps.selectProps;

  const value = restProps.getValue();
  const valueCount = value ? value.length : 0;

  return (
    <components.ValueContainer
      hasValue={hasValue}
      {...restProps}
      className={cx(!hasValue && styles.HasValue)}
    >
      {hasValue && !menuIsOpen ? (
        <span className={cx(clearAllClassName)}>
          ({valueCount}) {text}
        </span>
      ) : null}
      {children}
    </components.ValueContainer>
  );
}

export const FilterForm = forwardRef(
  (
    {
      filterState,
      onChange,
      filterOptions = {
        municipalities: [],
        years: [],
        doctorTypes: [],
      },
    },
    ref,
  ) => {
    const tCommon = t('analytics.common', { returnObjects: true });
    const { doctorTypes: doctorTypesTranslations, buttons: tButtons } = tCommon;

    const onFormChange = e => {
      if (e?.target) {
        onChange(e);
        return;
      }

      onChange({
        target: {
          name: e.name,
          value: e?.value ?? '',
        },
      });
    };

    const handleMultiSelectChange = selectedOptions => {
      const selectedMunicipalities = selectedOptions.map(option => option.value);
      onChange({ target: { name: 'municipalities', value: selectedMunicipalities } });
    };

    return (
      <form ref={ref} action="" className={styles.FilterForm}>
        <div>
          <Label htmlFor="municipality">{tCommon.municipality}</Label>
          <CustomReactSelect
            styles={{
              input: base => ({
                ...base,
                minWidth: '28ch',
              }),
            }}
            name="municipalities"
            id="municipalities"
            delimitier=","
            isMulti
            onChange={handleMultiSelectChange}
            value={filterState.municipalities.map(municipality => ({
              name: 'municipalities',
              label: municipality,
              value: municipality,
            }))}
            options={filterOptions.municipalities.map(municipality => ({
              name: 'municipalities',
              label: municipality,
              value: municipality,
            }))}
            placeholder={tCommon.selectMunicipality}
            components={{
              ...components,
              ValueContainer: props => (
                <CustomValueContainer
                  text={tButtons.clearAll}
                  clearAllClassName={styles.MunClearAll}
                  {...props}
                />
              ),
            }}
          />
        </div>
        <div>
          <Label htmlFor="year">{tCommon.year}</Label>
          <CustomReactSelect
            styles={{
              input: base => ({
                ...base,
                minWidth: '8ch',
              }),
            }}
            name="year"
            id="year"
            value={{
              name: 'year',
              label: filterState.year,
              value: filterState.year,
            }}
            onChange={onFormChange}
            options={filterOptions.years.map(year => ({
              name: 'year',
              label: year,
              value: year,
            }))}
          />
        </div>
        <div>
          <Label htmlFor="doctorType">{tCommon.doctorType}</Label>
          <CustomReactSelect
            styles={{
              input: base => ({
                ...base,
                minWidth: '28ch',
              }),
            }}
            name="doctorType"
            id="doctorType"
            value={{
              name: 'doctorType',
              label: doctorTypesTranslations[filterState.doctorType],
              value: filterState.doctorType,
            }}
            onChange={onFormChange}
            options={filterOptions.doctorTypes.map(doctorType => ({
              name: 'doctorType',
              label: doctorTypesTranslations[doctorType],
              value: doctorType,
            }))}
          />
        </div>
      </form>
    );
  },
);
