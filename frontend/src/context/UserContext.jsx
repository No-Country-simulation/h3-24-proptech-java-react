import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
