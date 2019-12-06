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
const user_manage_addnew = async (data) => {
    console.log("truyen du lieu: ", data)
  try {
    let response = await axios.post(`http://localhost:4001/admin/user`, data);
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const user_manage_block = async id => {
  try {
    var block = true
    let response = await axios.put(`http://localhost:4001/user/${id}`, block);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
const logout = () => {
  localStorage.removeItem("access_token");
};
export { user_manage_getData, user_manage_block, user_manage_addnew };
