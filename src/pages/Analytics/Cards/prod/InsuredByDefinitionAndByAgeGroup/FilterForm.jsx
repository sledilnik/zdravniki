/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */

import { forwardRef } from 'react';
import Select from 'react-select';
import { ASSIGNED_TYPES_MAP, CONTRACT_TYPES_MAP, DOCTOR_TYPES_MAP } from './data';

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
          <label
            htmlFor="municipality"
            style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}
          >
            Občina
          </label>
          <Select
            styles={{
              container: base => ({
                ...base,
                minWidth: '30ch',
                maxWidth: '40ch',
              }),
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
          <label htmlFor="year" style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}>
            Leto
          </label>
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
          <label htmlFor="ageGroup" style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}>
            Skupina
          </label>
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
          <label htmlFor="doctorType" style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}>
            Zdravnik
          </label>
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
          <label
            htmlFor="contractType"
            style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}
          >
            Status
          </label>
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
          <label
            htmlFor="assignedType"
            style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}
          >
            Opredeljenost
          </label>
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
