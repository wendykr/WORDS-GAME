import React, {useState, useEffect, useContext, createContext} from 'react';

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({children}) => {

  const [isToken, setIsToken] = useState(false);

  isToken && sessionStorage.setItem('token',JSON.stringify(isToken));

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setIsToken(data);
    }
    
  }, [])

  return (
    <AuthenticationContext.Provider value={{
      isToken, setIsToken
    }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthentication = () => useContext(AuthenticationContext);