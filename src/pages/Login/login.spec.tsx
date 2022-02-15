import { render, screen, userEvent, waitFor } from '../../utils/testProvider';
import Login from './index';

describe('Login', () => {
  it('should display login form', async () => {
    const { handleLogin, notify, mockedNavigate } = render(<Login />, {
      routePath: '/login',
      initialRoute: ['/login'],
    });

    screen.getByRole('heading', { name: 'Login' });

    const usernameInput = screen.getByPlaceholderText(
      'username',
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      'password',
    ) as HTMLInputElement;

    expect(usernameInput.value).toBe('');
    expect(passwordInput.value).toBe('');

    userEvent.type(usernameInput, 'teste@teste.com');
    userEvent.type(passwordInput, '123');

    expect(usernameInput.value).toBe('teste@teste.com');
    expect(passwordInput.value).toBe('123');

    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    userEvent.click(submitButton);

    expect(handleLogin).toHaveBeenCalledTimes(1);
    expect(handleLogin).toHaveBeenCalledWith({
      username: 'teste@teste.com',
      password: '123',
    });

    await waitFor(() =>
      expect(notify).toHaveBeenCalledWith('Welcome!', 'SUCCESS'),
    );

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
