import React from 'react';
import './LoginBar.scss';
import { LoginForm } from '../LoginForm/LoginForm';
import { useSettings } from '../../context/SettingsContext';
import { useAuthentication } from '../../context/AuthenticationContext';

import { FaUserTimes } from 'react-icons/fa';
import { FaUserCheck } from 'react-icons/fa';

export const LoginBar = () => {
  const { isShowForm, setIsShowForm } = useSettings();
  const { isToken, setIsToken } = useAuthentication();

  const handleShowForm = () => {
    setIsShowForm(true);
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsToken(false);
    isShowForm(false);
  };

  return (
    <div className="loginBar">
      <div className={`loginBar__container ${isShowForm ? 'justify-center' : 'justify-end'}`}>
        { isShowForm && <LoginForm /> }
        <div className="login__icon">
        { isToken ? <FaUserCheck className="icon-logout" onClick={handleLogout} title="Logout" /> :
          !isShowForm && <FaUserTimes className="icon-login" onClick={handleShowForm} title="Login" /> }
        </div>
      </div>
    </div>
  );
}