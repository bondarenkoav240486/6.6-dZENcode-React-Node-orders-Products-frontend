import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../redux/slices/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'next-i18next';

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const AuthPage: React.FC = () => {
  const { t } = useTranslation('common');
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const [message, setMessage] = useState<string>('');
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok && result.token) {
      localStorage.setItem('token', result.token);
      dispatch(setAuthenticated(true));
      router.push('/');
    } else {
      setMessage(result.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>{t('login')}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">{t('email')}</label>
          <input
            id="email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email')}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">{t('password')}</label>
          <input
            id="password"
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password')}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary">{t('login')}</button>
      </form>
      {message && <div className="alert alert-danger mt-3">{message}</div>}
    </div>
  );
};

export default AuthPage;