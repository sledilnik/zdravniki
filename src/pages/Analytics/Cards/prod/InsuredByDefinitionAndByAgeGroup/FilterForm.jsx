/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */

import { cx } from 'class-variance-authority';

import { forwardRef } from 'react';
import Select from 'react-select';
import styles from './FilterForm.module.css';
import { ASSIGNED_TYPES_MAP, CONTRACT_TYPES_MAP, DOCTOR_TYPES_MAP } from './data';

const Label = function Label({ children, className, ...props }) {
  return (
    <label className={cx(styles.Label, className)} {...props}>
      {children}
    </label>
  );
};

export const FilterForm = forwardRef(
  (
    {
      filterState,
      onChange,
      filterOptions = {
        municipalities: [],
        years: [],
        ageGroups: [],
        doctorTypes: [],
        assignedTypes: [],
        contractTypes: [],
      },
    },
    ref,
  ) => {
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

    return (
      <form ref={ref} action="" style={{ display: 'flex', gap: '0.5em', flexWrap: 'wrap' }}>
        <div
          style={{
            flex: '1 1 0',
          }}
        >
          <Label htmlFor="municipality">Občina</Label>
          <Select
            styles={{
              control: (base, state) => ({
                ...base,
                cursor: 'pointer',
                outlineColor: 'red',
                boxShadow: state.isFocused ? '0 0 7px 0 rgba(9,175,218,0.76)' : 'none',
                borderColor: state.isFocused
                  ? 'rgba(9,175,218,0.76)'
                  : state.theme.colors.neutral20,
                ':hover': {
                  borderColor: 'rgba(9,175,218,0.76)',
                },
              }),
              input: base => ({
                ...base,
                minWidth: '30ch',
                maxWidth: '40ch',
              }),
              option: (base, state) => {
                const backgroundColor = state.isSelected
                  ? 'rgba(9,175,218,1)'
                  : state.isFocused
                    ? 'rgba(9,175,218,0.26)'
                    : 'white';

                return {
                  ...base,
                  cursor: 'pointer',
                  backgroundColor,
                  fontWeight: state.isSelected ? '500' : '400',
                };
              },
            }}
            name="municipality"
            id="municipality"
            value={{
              name: 'municipality',
              label: filterState.municipality,
              value: filterState.municipality,
            }}
            onChange={onFormChange}
            options={filterOptions.municipalities.map(municipality => ({
              name: 'municipality',
              value: municipality,
              label: municipality,
            }))}
            isSearchable
          />
        </div>
        <div>
          <Label htmlFor="year">Leto</Label>
          <Select
            name="year"
            id="year"
            value={{ name: 'year', value: filterState.year, label: filterState.year }}
            onChange={onFormChange}
            options={filterOptions.years
              .sort((a, b) => b - a)
              .map(year => ({ value: year, label: year, name: 'year' }))}
          />
        </div>
        <div>
          <Label htmlFor="ageGroup">Skupina</Label>
          <Select
            styles={{
              input: base => ({ ...base, minWidth: '5ch' }),
              menu: base => ({ ...base, minWidth: '5ch' }),
              control: base => ({ ...base, cursor: 'pointer' }),
              option: base => ({ ...base, cursor: 'pointer' }),
            }}
            name="ageGroup"
            id="ageGroup"
            value={{ name: 'ageGroup', value: filterState.ageGroup, label: filterState.ageGroup }}
            onChange={onFormChange}
            options={filterOptions.ageGroups.map(ageGroup => ({
              value: ageGroup,
              label: ageGroup,
              name: 'ageGroup',
            }))}
          />
        </div>
        <div>
          <Label htmlFor="doctorType">Zdravnik</Label>
          <Select
            styles={{ container: base => ({ ...base, minWidth: '20ch' }) }}
            name="doctorType"
            id="doctorType"
            value={{
              name: 'doctorType',
              value: filterState.doctorType,
              label: DOCTOR_TYPES_MAP[filterState.doctorType],
            }}
            onChange={onFormChange}
            options={filterOptions.doctorTypes.map(doctorType => ({
              value: doctorType,
              label: DOCTOR_TYPES_MAP[doctorType],
              name: 'doctorType',
            }))}
            isSearchable
          />
        </div>
        <div>
          <Label htmlFor="contractType">Status</Label>
          <Select
            styles={{
              input: base => ({ ...base, minWidth: '8ch' }),
            }}
            name="contractType"
            id="contractType"
            value={{
              name: 'contractType',
              value: filterState.contractType,
              label: CONTRACT_TYPES_MAP[filterState.contractType],
            }}
            onChange={onFormChange}
            options={[
              { value: 'all', label: 'Vsi', name: 'contractType' },
              ...filterOptions.contractTypes.map(contractType => ({
                value: contractType,
                label: CONTRACT_TYPES_MAP[contractType],
                name: 'contractType',
              })),
            ]}
          />
        </div>
        <div>
          <Label htmlFor="assignedType">Opredeljenost</Label>
          <Select
            styles={{
              input: base => ({ ...base, minWidth: '12ch' }),
              control: base => ({ ...base, cursor: 'pointer' }),
              option: base => ({ ...base, cursor: 'pointer' }),
            }}
            name="assignedType"
            id="assignedType"
            value={{
              name: 'assignedType',
              value: filterState.assignedType,
              label: ASSIGNED_TYPES_MAP[filterState.assignedType],
            }}
            onChange={onFormChange}
            options={[
              { value: 'all', label: 'Vsi', name: 'assignedType' },
              ...filterOptions.assignedTypes.map(assignedType => ({
                value: assignedType,
                label: ASSIGNED_TYPES_MAP[assignedType],
                name: 'assignedType',
              })),
            ]}
          />
        </div>
      </form>
    );
  },
);

FilterForm.displayName = 'FilterForm';
