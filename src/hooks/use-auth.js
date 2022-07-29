import { useCallback, useState } from "react";
import { getData, putData } from "../database/database-utility";
import { API_KEY } from "../global/Globals";

const useAuth = () => {
  const [uid, setUid] = useState("");
  const [idToken, setIdToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [expireTime, setExpireTime] = useState(0);

  const getExpireTime = (expiresIn) => {
    const expireTime = Date.now() + expiresIn * 1000;
    return expireTime;
  };

  const setAuthInLocalStorage = () => {
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("uid", uid);
    localStorage.setItem("email", userEmail);
    localStorage.setItem("name", userName);
    localStorage.setItem("expireTime", expireTime.toString());
  };

  const getAuthInLocalStorage = () => {
    const savedIdToken = localStorage.getItem("idToken");
    const savedUid = localStorage.getItem("uid");
    const savedEmail = localStorage.getItem("email");
    const savedName = localStorage.getItem("name");
    const savedExpireTime = Number(localStorage.getItem("expireTime"));
    console.log({savedIdToken, savedUid, savedEmail})
    return {
      idToken: savedIdToken,
      uid: savedUid,
      email: savedEmail,
      name: savedName,
      expireTime: savedExpireTime,
    };
  };

  const removeAuthInLocalStorage = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("uid");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("expireTime");
  };

  const getUserData = async (uid) => {
    const { name } = await getData(`/users/${uid}`);
    setUserName(name);
  };

  const setPreviousAuth = useCallback(() => {
    console.log("Set")
    const { idToken, uid, expireTime, email, name } = getAuthInLocalStorage();
    const timeRemaining = expireTime - Date.now();
    console.log(timeRemaining);
    if (timeRemaining < 60000) {
      removeAuthInLocalStorage();
      return;
    }

    if (uid && idToken) {
      setUid(uid);
      setIdToken(idToken);
      setUserEmail(email);
      setUserName(name);
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
    setExpireTime(getExpireTime(expiresIn))
    getUserData(uid).then(() => setAuthInLocalStorage())
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
    createUser,
    loginUser,
    logout,
    setPreviousAuth,
  };
};

export default useAuth;
