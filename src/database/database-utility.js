import { RT_DB_URL } from "../global/Globals";

const makeRequest = async (dbPath, data, method) => {
  try {
    const headers =
      method === "GET"
        ? {}
        : {
            method: method,
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          };
    const response = await fetch(`${RT_DB_URL}${dbPath}.json`, headers);
    if (!response.ok) {
      console.log(`Error in making ${method} request`);
      return { error: `Error in making ${method} request` };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { error };
  }
};

export const putData = async (dbPath, data) => {
  try {
    makeRequest(dbPath, data, "PUT");
  } catch (e) {
    console.log(e);
  }
};

export const patchData = async (dbPath, data) => {
  try {
    makeRequest(dbPath, data, "PATCH");
  } catch (e) {
    console.log(e);
  }
}

export const getData = async (dbPath) => {
  try {
    const data = await makeRequest(dbPath, undefined, "GET");
    return data;
  } catch (e) {
    console.log(e);
  }
};
