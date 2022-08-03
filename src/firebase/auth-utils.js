import { API_KEY } from "../global/Globals";

const authRequest = async (url, body) => {
  console.log(body);
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
      console.log(data.error);
      return { ok: false, error: data.error.message };
    } else {
      return { ok: true, data };
    }
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const updateProfile = async (idToken, displayName, photoUrl) => {
  try {
    const response = await authRequest(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=",
      {
        idToken,
        displayName,
        photoUrl,
        returnSecureToken: false,
      }
    );
    return response;
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getProfile = async (idToken) => {
  try {
    const response = await authRequest(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=",
      {
        idToken,
      }
    );
    return response;
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const signUp = async (email, password) => {
  try {
    const response = await authRequest(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    console.log(response.data);
    const { idToken } = response.data;
    const { displayName } = await updateProfile(idToken, email, "");
    return { ok: true, data: {...response.data, displayName, tagline: "" }};
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await authRequest(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    const { idToken } = response.data;
    const profileResponse = await getProfile(idToken);
    const { displayName } = profileResponse.data.users[0];
    return { displayName, ...response };
  } catch (error) {
    console.log(error);
    return { ok: false, error: error };
  }
};
