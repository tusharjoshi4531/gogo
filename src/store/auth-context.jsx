import { createContext, useEffect } from "react";
import useAuth from "../hooks/use-auth";

const AuthContext = createContext({
  uid: "",
  idToken: "",
  email: "",
  name: "",
  createUser: (email, password) => {},
  loginUser: (email, password) => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const { uid, idToken, userName: name, userEmail: email, createUser, loginUser, logout, setPreviousAuth } =
    useAuth();

  useEffect(() => {
    setPreviousAuth();
  }, [setPreviousAuth]);

  const contextValue = {
    uid,
    idToken,
    email,
    name,
    createUser,
    loginUser,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
