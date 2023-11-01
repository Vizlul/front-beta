import axios from "axios";

const CallApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { Accept: 'application/json', "Content-Type": "application/json" }
});

// Add a request interceptor
CallApi.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
CallApi.interceptors.response.use(
  async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return Promise.resolve(response);
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default CallApi;
