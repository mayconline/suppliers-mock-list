import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'https://psad9m6vrj.execute-api.sa-east-1.amazonaws.com/test',
});

export default api;

const successAPIErrorHandler = (response: AxiosResponse) => {
  if (response.status && ![200, 201].includes(response.status)) {
    throw new Error();
  }

  return response;
};

const errorAPIErrorHandler = (error: AxiosError) => {
  if (error?.response?.status && [401, 403].includes(error?.response?.status)) {
    sessionStorage.removeItem('@fakeToken');
    window.location.assign('/login');
  }

  return Promise.reject(error);
};

api.interceptors.response.use(successAPIErrorHandler, errorAPIErrorHandler);
