import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/header';
import useAuth from '../hooks/useAuth';

const PrivateRoute = () => {
  const { hasToken } = useAuth();

  return hasToken ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
