import CssBaseline from '@mui/material/CssBaseline';
import { doctorsContext, doctorsByTypeContext } from './context';

function App() {
  return (
    <div>
      <h1>Zdravniki</h1>
    </div>
  );
}

function AppWrapper() {
  return (
    <>
      <CssBaseline />
      <doctorsContext.DoctorsProvider>
        <doctorsByTypeContext.DoctorsByTypeProvider>
          <App />
        </doctorsByTypeContext.DoctorsByTypeProvider>
      </doctorsContext.DoctorsProvider>
    </>
  );
}

export default AppWrapper;
