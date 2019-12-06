import axios from "axios";
import checkToken from "./CheckToken"
var instansce = axios.create({
  baseURL: "http://localhost:4000",
  headers: { access_token: `${checkToken()}` }
});
const SERVER_URL = "http://localhost:4000";
const group = async () => {
  const GROUP_ENDPOINT = `${SERVER_URL}/home`;
  try {
    let res = await instansce.get(GROUP_ENDPOINT);
    console.log(res)
    console.log("res");
    localStorage.setItem("data", JSON.stringify(res));
    return res;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export { group };




