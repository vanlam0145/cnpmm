import axios from "axios";
import checkToken from "./CheckToken"
const access_token = localStorage.getItem("access_token");
var instansce = axios.create({
  baseURL: "http://localhost:4000",
  headers: { access_token: `${checkToken()}` }
});
const SERVER_URL = "http://localhost:4000";
const group = async () => {
  const GROUP_ENDPOINT = `${SERVER_URL}/home`;
  try {
    let res = await instansce.get(GROUP_ENDPOINT);
    return res;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export { group };
