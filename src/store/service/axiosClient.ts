import axios, { AxiosResponse } from "axios";

const defaultHeader = {
  // "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  Accept: "application/json",
};
// for multiple requests

// @ts-ignore
const baseURL: string = "https://pay-extension.esollabs.com/v1/api";

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: baseURL,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return handleResponse(response);
  },
  async (error) => {
    console.log(error);
    return Promise.reject(handleError(error));
  }
);

const handleResponse = (res: AxiosResponse<any>) => {
  return res.data;
};

const handleError = (error: AxiosResponse<any>) => {
  return error;
};

export default axiosClient;
