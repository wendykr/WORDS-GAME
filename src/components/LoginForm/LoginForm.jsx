import React, { useState } from 'react';
import './LoginForm.scss';
import { supabase } from '../../supabaseClient';
import { useAuthentication } from '../../context/AuthenticationContext';

export const LoginForm = () => {
  const { setIsToken, setIsShowForm } = useAuthentication();

  const [formData, setFormData] = useState({
    email: '', password: ''
  });

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

      if (error) throw error
      setIsToken(data);
      setFormData({ email: '', password: '' });
      setIsShowForm(false);

    } catch (error) {
      alert(error)
    }
  };

  const handleCloseForm = () => {
    setIsShowForm(false);
  }

  return (
    <form className="loginForm">
      <div className="loginForm__row">
        <input type="email" name="email" value={formData.email} placeholder="e-mail" onChange={handleChange} />
      </div>
      <div className="loginForm__row">
        <input type="password" name="password" value={formData.password} placeholder="password" onChange={handleChange} />
      </div>
      <div className="loginForm__row">
        <button className="loginForm__button" onClick={handleLogin}>Login</button> <button className="loginForm__button" onClick={handleCloseForm}>Close</button>
      </div>
    </form>
  );
};