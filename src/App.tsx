import './App.scss';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthContextProvider } from 'context/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {location.pathname !== '/' && <Navbar />}
        <Outlet />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
