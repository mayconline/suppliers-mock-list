import { createContext, useCallback, useState } from 'react';
import api from '../services/api';
import { AuthContextType, GetTokenType, LoginFormValueType } from '../types';

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem('@fakeToken'),
  );

  const handleLogin = useCallback(
    async (data: LoginFormValueType) => {
      const formData = new FormData();
      formData.append('grant_type', 'password');
      formData.append('username', data.username);
      formData.append('password', data.password);
      formData.append('scope', 'web');

      try {
        const response = await api.post<GetTokenType>(
          '/oauth/token',
          formData,
          {
            auth: {
              username: import.meta.env.VITE_BASIC_AUTH_USERNAME as string,
              password: import.meta.env.VITE_BASIC_AUTH_PASSWORD as string,
            },
          },
        );

        if (!!response?.data?.access_token) {
          setToken(response.data.access_token);
          sessionStorage.setItem('@fakeToken', response.data.access_token);
        }
      } catch (err: any) {
        throw new Error('Failed to login');
      }
    },
    [token],
  );

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('@fakeToken');
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        hasToken: !!token,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
