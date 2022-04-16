import axios, { AxiosError, AxiosInstance } from 'axios';

interface AxiosType {
  instance: AxiosInstance;
  get: (url: string, config?: any) => Promise<any>;
  post: (url: string, data?: any, config?: any) => Promise<any>;
  delete: (url: string, config?: any) => Promise<any>;
  put: (url: string, data?: any, config?: any) => Promise<any>;
  patch: (url: string, data?: any, config?: any) => Promise<any>;
}

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = 'https://ably-frontend-assignment-server.vercel.app/api';
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      // 요청이 이루어쪗으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답
      console.error('http error status: ', error.response.status, ', data: ', error.response.data);
    } else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못함
      console.error('server is not responding. server is not valid or invalid path or check network.', error.request);
    } else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생
      console.error('Error', error);
    }
    return Promise.reject(error);
  },
);

const APIs: AxiosType = {
  instance: axiosInstance,

  async get(url: string, config = {}) {
    const response = await this.instance.get(url, config);
    return response;
  },

  async post(url: string, data = {}, config = {}) {
    const response = await this.instance.post(url, data, config);
    return response;
  },

  async put(url: string, data = {}, config = {}) {
    const response = await this.instance.put(url, data, config);
    return response;
  },

  async delete(url: string, config = {}) {
    const response = await this.instance.delete(url, config);
    return response;
  },

  async patch(url: string, data = {}, config = {}) {
    const response = await this.instance.patch(url, data, config);
    return response;
  },
};

export default APIs;
