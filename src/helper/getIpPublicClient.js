import Axios from "axios";

export const getIpPublicClient = async () => {
  try {
    const response = await Axios.get("https://ipv4.icanhazip.com/");
    return response;
  } catch (error) {
    return 400;
  }
};
