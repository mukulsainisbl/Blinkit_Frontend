import SummaryApi, { baseURL } from "../common/summaryApi";
import axios from "axios";

const AxiosReq = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

//Sending access token in the header
AxiosReq.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Entend the life span of refresh token with the help of resfresh token
AxiosReq.interceptors.request.use(
  (response) => {
    return response;
  },
  async (error) => {
    let orginalRequest = error.config;
    if (error.response.status === 401 && !orginalRequest.retry) {
      orginalRequest.retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        const newAccesToken = await refreshAccessToken(refreshToken);

        if(newAccesToken){
            orginalRequest.headers.Authorization= `Bearer ${newAccesToken}`
            return AxiosReq(orginalRequest)
        }
      }
    }

    return Promise.reject(error)
  }
);
const refreshAccessToken = async (refreshToken) => {
  try {
    let response = await AxiosReq({
      ...SummaryApi.refreshToken,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const accessToken = response.data.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export default AxiosReq;
