import React, { createContext, useContext, useState } from 'react';

const ValentineContext = createContext();

export const useValentine = () => useContext(ValentineContext);

export const ValentineProvider = ({ children }) => {
  const [saidYes, setSaidYes] = useState(() => {
    return localStorage.getItem('qt-said-yes') === 'true';
  });

  const sayYes = () => {
    setSaidYes(true);
    localStorage.setItem('qt-said-yes', 'true');
  };

  const reset = () => {
    setSaidYes(false);
    localStorage.removeItem('qt-said-yes');
  };

  return (
    <ValentineContext.Provider value={{ saidYes, sayYes, reset }}>
      {children}
    </ValentineContext.Provider>
  );
};
