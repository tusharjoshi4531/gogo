import { useCallback, useState } from "react";
// import { putData } from "../firebase/database-utility";
import { signIn, signUp, updateProfile } from "../firebase/auth-utils";
import { getData, patchData } from "../firebase/database-utility";

const useAuth = () => {
  const [uid, setUid] = useState("");
  const [idToken, setIdToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userTagline, setUserTagline] = useState("");

  const getExpireTime = (expiresIn) => {
    const expireTime = Date.now() + expiresIn * 1000;
    return expireTime;
  };

  const setAuthInLocalStorage = (
    idToken,
    uid,
    email,
    name,
    expireTime,
    tagline
  ) => {
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("uid", uid);
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    localStorage.setItem("expireTime", expireTime.toString());
    localStorage.setItem("tagline", !tagline ? "" : tagline);
    console.log("set", { idToken });
  };

  const getAuthInLocalStorage = () => {
    const savedIdToken = localStorage.getItem("idToken");
    const savedUid = localStorage.getItem("uid");
    const savedEmail = localStorage.getItem("email");
    const savedName = localStorage.getItem("name");
    const savedExpireTime = Number(localStorage.getItem("expireTime"));
    const savedTagline = localStorage.getItem("tagline");
    return {
      idToken: savedIdToken,
      uid: savedUid,
      email: savedEmail,
      name: savedName,
      expireTime: savedExpireTime,
      tagline: savedTagline,
    };
  };

  const removeAuthInLocalStorage = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("uid");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("expireTime");
    localStorage.removeItem("tagline");
  };

  // const getUserData = async (uid) => {
  //   const { name, tagline } = await getData(`/users/${uid}`);
  //   setUserName(name);
  //   setUserTagline(!tagline ? "" : tagline);
  //   return { name, tagline };
  // };

  const setPreviousAuth = useCallback(() => {
    const { idToken, uid, expireTime, email, name, tagline } =
      getAuthInLocalStorage();
    const timeRemaining = expireTime - Date.now();
    console.log(timeRemaining);
    if (timeRemaining < 60000) {
      removeAuthInLocalStorage();
      return;
    }

    if (uid) {
      setUid(uid);
      setIdToken(idToken);
      setUserEmail(email);
      setUserName(name);
      setUserTagline(!tagline ? "" : tagline);
    }
  }, []);

  const login = (uid, idToken, email, expiresIn, name, tagline) => {
    setUid(uid);
    setIdToken(idToken);
    setUserEmail(email);
    setUserName(name);
    setUserTagline(tagline);
    const expireTime = getExpireTime(expiresIn);
    setAuthInLocalStorage(idToken, uid, email, name, expireTime, tagline);
  };

  // const createAccount = (uid, name) => {
  //   putData(`/users/${uid}`, {
  //     name,
  //   });
  // };

  const createUser = async (email, password) => {
    const response = await signUp(email, password);

    if (response.ok) {
      const { localId: uid, idToken, expiresIn, tagline } = response.data;
      console.log(response.data);
      patchData(`/users/${uid}`, {
        tagline,
        name: email,
        uid, 
      });
      login(uid, idToken, email, expiresIn, email);
      return { ok: true };
    } else {
      return response;
    }
  };

  const loginUser = async (email, password) => {
    const authResponse = await signIn(email, password);
    
    if (authResponse.ok) {
      const { localId: uid, idToken, expiresIn, displayName } = authResponse.data;
      const dbResponse = await getData(`/user-data/${uid}`);
      
      if(dbResponse.ok){
        let tagline = ""
        if(dbResponse.data){
          tagline = dbResponse.data.tagline;
        }
        login(uid, idToken, email, expiresIn, displayName, tagline);
        return { ok: true };
      }else{
        login(uid, idToken, email, expiresIn, displayName, "");
        return dbResponse;
      }
    } else {
      return authResponse;
    }
  };

  const logout = () => {
    setUid("");
    setIdToken("");
    setUserName("");
    setUserEmail("");
    removeAuthInLocalStorage();
  };

  const updateUserInfo = (name, tagline) => {
    updateProfile(idToken, name, "").then(() => {
      setUserName(name);
      localStorage.setItem("name", name);
    });
    
    patchData(`/users/${uid}`, {
      name, 
      tagline,
    }).then(() => {
      setUserTagline(tagline)
      localStorage.setItem("tagline", tagline);
    });
  };

  return {
    uid,
    idToken,
    userEmail,
    userName,
    userTagline,
    setPreviousAuth,
    createUser,
    loginUser,
    logout,
    updateUserInfo,
  };
};

export default useAuth;
