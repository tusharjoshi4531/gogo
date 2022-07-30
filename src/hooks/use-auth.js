import { useCallback, useState } from "react";
import { getData, putData } from "../database/database-utility";
import { API_KEY } from "../global/Globals";

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

  const getUserData = async (uid) => {
    const { name, tagline } = await getData(`/users/${uid}`);
    setUserName(name);
    setUserTagline(!tagline ? "" : tagline);
    return { name, tagline };
  };

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

  const authRequest = async (url, body) => {
    try {
      const response = await fetch(`${url}${API_KEY}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error.message);
        return { ok: false, error: data.error.message };
      } else {
        return { ok: true, data };
      }
    } catch (error) {
      return { ok: false, error: error.message };
    }
  };

  const login = (uid, idToken, email, expiresIn) => {
    setUid(uid);
    setIdToken(idToken);
    setUserEmail(email);
    const expireTime = getExpireTime(expiresIn);
    getUserData(uid).then(({ name, tagline }) =>
      setAuthInLocalStorage(idToken, uid, email, name, expireTime, tagline)
    );
  };

  const createAccount = (uid, name) => {
    putData(`/users/${uid}`, {
      name,
    });
  };

  const createUser = async (email, password) => {
    const response = await authRequest(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    if (response.ok) {
      const { localId: uid, idToken, expiresIn } = response.data;
      createAccount(uid, email);
      login(uid, idToken, email, expiresIn);
      return { ok: true };
    } else {
      return response;
    }
  };

  const loginUser = async (email, password) => {
    const response = await authRequest(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    if (response.ok) {
      const { localId: uid, idToken, expiresIn } = response.data;
      login(uid, idToken, email, expiresIn);
      return { ok: true };
    } else {
      return response;
    }
  };

  const logout = () => {
    setUid("");
    setIdToken("");
    setUserName("");
    setUserEmail("");
    removeAuthInLocalStorage();
  };

  return {
    uid,
    idToken,
    userEmail,
    userName,
    userTagline,
    createUser,
    loginUser,
    logout,
    setPreviousAuth,
  };
};

export default useAuth;
