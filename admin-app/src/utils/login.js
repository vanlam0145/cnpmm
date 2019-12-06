import axios from "axios";
import setCookie from "../utils/setCookie";
const SERVER_URL = "";
const login = async data => {
  const LOGIN_ENDPOINT = `${SERVER_URL}/`;

  try {
    console.log(data);
    const { username, password } = data;
    const user = { username: username, password: password };
    let response = await axios.post(LOGIN_ENDPOINT, user);
    console.log("hihi" + response.data);
    console.log("cc: ", response.status);

    if (response.status === 200 && response.data) {
      let jwt = response.data;
      console.log(jwt);
      if (data.cbRemember == true) {
        console.log("cc");
        setCookie(jwt);
      } else if (data.cbRemember == false) {
        document.cookie = `token=${jwt}`;
      }
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
