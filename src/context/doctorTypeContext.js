import { createContext, useContext, useState } from 'react';
import { useDoctors } from './doctorsContext';

const DoctorsByTypeContext = createContext();

export const DoctorsByTypeConsumer = DoctorsByTypeContext.Consumer;

function DoctorsByTypeProvider({ children }) {
  const [doctorType, setDoctorType] = useState('doctors');
  const allDoctors = useDoctors();
  const doctors = allDoctors[doctorType];

  const value = { doctors, doctorType, setDoctorType };

  return <DoctorsByTypeContext.Provider value={value}>{children}</DoctorsByTypeContext.Provider>;
}

function useDoctorsByType() {
  const context = useContext(DoctorsByTypeContext);

  if (!context) {
    throw new Error('useDoctorsByType must be used within a DoctorTypeProvider');
  }
  return context;
}

export { DoctorsByTypeProvider, useDoctorsByType };
