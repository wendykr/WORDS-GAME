import Reac, { useState } from 'react';
import './LoginBar.scss';
import { LoginForm } from '../LoginForm/LoginForm';
import { useAuthentication } from '../../context/AuthenticationContext';

import { FaUserTimes } from 'react-icons/fa';
import { FaUserCheck } from 'react-icons/fa';

export const LoginBar = () => {
  const { isToken, setIsToken, isShowForm, setIsShowForm } = useAuthentication();

  const handleShowForm = () => {
    setIsShowForm(true);
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsToken(false);
    isShowForm(false);
  };

  return (
    <div className={`loginBar ${isShowForm ? 'justify-center' : 'justify-end  absolute'}`}>
      {isShowForm && <LoginForm />}
      <div className="login__icon">
      { isToken ? <FaUserCheck className="icon-logout" onClick={handleLogout} title="Logout" /> :
        !isShowForm && <FaUserTimes className="icon-login" onClick={handleShowForm} title="Login" />
      }
      </div>
    </div>
  )
}
