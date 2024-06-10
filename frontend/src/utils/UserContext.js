import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [filledOutForm, setFilledOutForm] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, filledOutForm, setFilledOutForm }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;