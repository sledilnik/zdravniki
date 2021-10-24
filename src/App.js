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
          <App />
    </>
  );
}

export default AppWrapper;
