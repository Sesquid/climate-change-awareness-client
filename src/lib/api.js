import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://climate-change-awareness-server-production.up.railway.app/api/"
});
export default axiosInstance;
