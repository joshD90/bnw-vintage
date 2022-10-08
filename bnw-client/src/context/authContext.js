import React, { useState } from "react";

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
