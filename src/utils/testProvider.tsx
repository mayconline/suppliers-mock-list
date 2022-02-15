import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthContext } from '../contexts/authContext';
import { Routes, Route, MemoryRouter } from 'react-router-dom';

const mockedNavigate = jest.fn();
const notify = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

jest.mock('./notification', () => ({
  notify,
}));

type OptTestProvider = {
  routePath: string;
  initialRoute: string[];
};

const contextMock = {
  hasToken: true,
  handleLogin: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ data: { access_token: 'token' } }),
    ),
  handleLogout: jest.fn(),
  token: 'token',
};

const testProvider = (children: JSX.Element, options: OptTestProvider) => {
  const renderUtils = render(
    <AuthContext.Provider value={contextMock}>
      <MemoryRouter initialEntries={options.initialRoute}>
        <Routes>
          <Route path={options.routePath} element={children} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );

  return {
    ...renderUtils,
    ...contextMock,
    notify,
    mockedNavigate,
  };
};

export * from '@testing-library/react';
export { testProvider as render, userEvent };
