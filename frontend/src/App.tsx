import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Login } from './components/Login';
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import PersistentLayout from "./components/PersistentLayout";
import Home from "./components/Home";
import About from "./components/About";
import ProtectedRoute from './components/ProtectedRoute';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Route: Login page (accessible only if not authenticated) */}
          <Route
            path="/"
            element={
              <ProtectedRoute requiredAuth={false}>
                <Login />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes: Accessible only if authenticated.
              These routes use the persistent layout. */}
          <Route
            path="/"
            element={
              <ProtectedRoute requiredAuth={true}>
                <PersistentLayout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            {/* Fallback: any unmatched route under authenticated area redirects to /home */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
