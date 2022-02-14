import './styles/globals.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import Routes from './routes';
import { AuthProvider } from './contexts/authContext';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './contexts/themeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastContainer style={{ marginTop: '4.5rem' }} />
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
