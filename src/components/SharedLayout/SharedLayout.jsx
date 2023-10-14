import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const SharedLayout = () => {

  const location = useLocation();

  const hideHeader = location.pathname === '/';

  return (
    <>
        {!hideHeader && <Header />}
        <Outlet />
        <Footer />
    </>
  )
};