import { createContext, useEffect } from "react";
import useAuth from "../hooks/use-auth";

const AuthContext = createContext({
  uid: "",
  idToken: "",
  email: "",
  name: "",
  createUser: (email, password) => {},
  loginUser: (email, password) => {},
  updateUserInfo: (name, tagline) => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const {
    uid,
    idToken,
    userName: name,
    userEmail: email,
    userTagline: tagline,
    createUser,
    loginUser,
    logout,
    setPreviousAuth,
    updateUserInfo,
  } = useAuth();

  useEffect(() => {
    setPreviousAuth();
  }, [setPreviousAuth]);

  const contextValue = {
    uid,
    idToken,
    email,
    name,
    tagline,
    createUser,
    loginUser,
    logout,
    updateUserInfo,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
