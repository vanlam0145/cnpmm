import axios from "axios";
import checkToken from "./CheckToken"
const access_token = checkToken();
console.log(access_token)
var instansce = axios.create({

  headers: { access_token: `${access_token}` }
});
const SERVER_URL = "";
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
