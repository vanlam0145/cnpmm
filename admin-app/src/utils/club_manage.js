import axios from "axios";
import setCookie from "../utils/setCookie";
const SERVER_URL = "";
const user_manage_getData = async () => {
    console.log("jhkhjghkjg")
  try {
    let response = await axios.get(`http://localhost:4001/users`);
    console.log("hihi" + response.data);
      //const {data} = response
      //console.log(data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
const user_mangae_addnew = async () => {
  try {
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
export { user_manage_getData, register, logout, user_mangae_addnew };
