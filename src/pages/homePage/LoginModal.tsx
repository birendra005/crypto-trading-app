import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginFormSchemaValidation } from '../../loginFormschemaValidation';
import Modal from '../../components/Modal';
import Textfield from '../../components/Textfield';
import Button from '../../components/Button';
import type { User } from '../../stores/authStore';
import { useTranslation } from 'react-i18next';
import './HomePage.css';

type LoginFormData = {
  name: string;
  email: string;
  password: string;
};

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginFormSchemaValidation),
  });

  const { t } = useTranslation();

  const onSubmit = (data: LoginFormData) => {
    onLogin(data);
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={t('login')}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Textfield label={t('name')} placeholder={t('name')} {...register('name')} />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <Textfield
          label={t('email')}
          type="email"
          placeholder="you@example.com"
          {...register('email')}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <Textfield
          label={t('password')}
          type="password"
          placeholder={t('password')}
          {...register('password')}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <Button type="submit" style={{ padding: '8px 16px', marginTop: '1rem' }}>
          {t('login')}
        </Button>
      </form>
    </Modal>
  );
};

export default LoginModal;
