import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export default useAuth;
