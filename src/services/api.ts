import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'https://psad9m6vrj.execute-api.sa-east-1.amazonaws.com/test',
});

export default api;

api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response.status);

    if (response.status && [401, 403].includes(response.status)) {
      const error = new Error();
      throw error;
    }

    return response;
  },
  error => {
    sessionStorage.removeItem('@fakeToken');
    window.location.assign('/login');

    return Promise.reject(error);
  },
);
