/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */

import { forwardRef } from 'react';
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
      onChange(e);
    };

    return (
      <form
        ref={ref}
        action=""
        style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}
      >
        <div>
          <label htmlFor="municipality">Občina</label>
          <select
            name="municipality"
            id="municipality"
            value={filterState.municipality}
            onChange={onFormChange}
          >
            {filterOptions.municipalities.map(municipality => (
              <option key={municipality} value={municipality}>
                {municipality}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year">Leto</label>
          <select name="year" id="year" value={filterState.year} onChange={onFormChange}>
            {filterOptions.years
              .sort((a, b) => b - a)
              .map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="ageGroup">Skupina</label>
          <select
            name="ageGroup"
            id="ageGroup"
            value={filterState.ageGroup}
            onChange={onFormChange}
          >
            {filterOptions.ageGroups.map(ageGroup => (
              <option key={ageGroup} value={ageGroup}>
                {ageGroup}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="doctorType">Zdravnik</label>
          <select
            name="doctorType"
            id="doctorType"
            value={filterState.doctorType}
            onChange={onFormChange}
          >
            {filterOptions.doctorTypes.map(doctorType => (
              <option key={doctorType} value={doctorType}>
                {DOCTOR_TYPES_MAP[doctorType]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contractType">Status</label>
          <select
            name="contractType"
            id="contractType"
            value={filterState.contractType}
            onChange={onFormChange}
          >
            <option value="all">Vsi</option>
            {filterOptions.contractTypes.map(contractType => (
              <option key={contractType} value={contractType}>
                {CONTRACT_TYPES_MAP[contractType]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="assignedType">Opredeljenost</label>
          <select
            name="assignedType"
            id="assignedType"
            value={filterState.assignedType}
            onChange={onFormChange}
          >
            <option value="all">Vsi</option>
            {filterOptions.assignedTypes.map(assignedType => (
              <option key={assignedType} value={assignedType}>
                {ASSIGNED_TYPES_MAP[assignedType]}
              </option>
            ))}
          </select>
        </div>
      </form>
    );
  },
);

FilterForm.displayName = 'FilterForm';
