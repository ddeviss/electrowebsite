import Axios from "axios";
import { getIpPublicClient } from "./getIpPublicClient";

export const getCountry = async () => {
  const { data } = await getIpPublicClient();
  const response = await Axios.get(`https://freegeoip.live/json/${data}`);
  return response.data;
};
