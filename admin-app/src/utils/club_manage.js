import axios from "axios";
import setCookie from "../utils/setCookie";
const SERVER_URL = "";
const club_manage_getData = async () => {
  console.log("jhkhjghkjg")
  try {
    let response = await axios.get(`http://localhost:4001/club`);
    console.log("hihi" + response.data);
    //const {data} = response
    //console.log(data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
export { club_manage_getData };
