import React, { createContext, useState } from "react";

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [sharedValue, setSharedValue] = useState({});

  return (
    <MyContext.Provider value={{ sharedValue, setSharedValue }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
