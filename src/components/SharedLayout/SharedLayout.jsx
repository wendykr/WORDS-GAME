import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const SharedLayout = () => {

  const location = useLocation();

  const isHeaderHidden = location.pathname === '/';

  return (
    <>
        {!isHeaderHidden && <Header />}
        <Outlet />
        <Footer />
    </>
  )
};