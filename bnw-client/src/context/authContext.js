import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
//initialize our cart context
export const AuthContext = React.createContext();
//set up our auth context provider to wrap every other div so that this can be passed down
//to any of its children
const AuthContextProvider = ({ children }) => {
  //we are not using complex state handling such as useReducer for simplification
  const [user, setUser] = useState(null);
  //while the component is loaded but the user state has not been set yet by firebase we do not load the children
  const [loading, setLoading] = useState(true);

  //this is a firebase auth listener to check on whether there has been a change in user login status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    //as this is a listener we return this
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
