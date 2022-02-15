import styles from './login.module.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/input';
import useAuth from '../../hooks/useAuth';
import { FaUserTie, FaLock, FaSignInAlt } from 'react-icons/fa';
import Button from '../../components/button';
import { LoginFormValueType } from '../../types';
import { notify } from '../../utils/notification';

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [stateForm, setStateForm] = useState<'LOADING' | 'ERROR' | null>(null);
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  } as LoginFormValueType);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStateForm('LOADING');

    try {
      await handleLogin(formValue);
      notify('Welcome!', 'SUCCESS');
      navigate('/');
      setStateForm(null);
    } catch (err: any) {
      setStateForm('ERROR');
      notify('Failed to login, please verify your credentials.', 'ERROR');
    }
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Input
          name="username"
          type="email"
          placeholder="username"
          value={formValue.username}
          onChange={handleChange}
          icon={FaUserTie}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          value={formValue.password}
          onChange={handleChange}
          icon={FaLock}
        />

        <div className={styles.action}>
          <Button
            icon={FaSignInAlt}
            disabled={!formValue.username || !formValue.password}
            loading={stateForm === 'LOADING'}
          >
            Sign In
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Login;
