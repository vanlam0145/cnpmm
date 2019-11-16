import axios from "axios";
const SERVER_URL = "http://localhost:4000";
const login = async data => {
  const LOGIN_ENDPOINT = `${SERVER_URL}/`;

  try {
    console.log(data);
    let response = await axios.post(LOGIN_ENDPOINT, data);
    console.log("hihi" + response.data);
    if (response.status === 200 && response.data) {
      let jwt = response.data;
      console.log(jwt);
      localStorage.setItem("access_token", jwt);
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const logingg = async () => {
  const LOGIN_ENDPOINT = `${SERVER_URL}/auth/google`;

  try {
    await axios.get(LOGIN_ENDPOINT);
    let response = await axios.get(`${SERVER_URL}/auth/google/callback`);
    console.log(response);
    if (response.status === 200 && response.data) {
      let jwt = response.data;
      localStorage.setItem("access_token", jwt);
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const register = async data => {
  const SIGNUP_ENDPOINT = `${SERVER_URL}/signup`;
  try {
    data.username = data.email;
    let response = await axios.post(SIGNUP_ENDPOINT, data);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
const logout = () => {
  localStorage.removeItem("access_token");
};
export { login, register, logout, logingg };
