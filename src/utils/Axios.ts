import axios, { AxiosError, AxiosInstance } from 'axios';

class Axios {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create();
    this.instance.defaults.baseURL = 'https://ably-frontend-assignment-server.vercel.app/api';
    this.instance.defaults.headers.common['Content-Type'] = 'applcation/json';

    this.instance.interceptors.response.use(
      response => {
        return response.data;
      },
      (error: AxiosError) => {
        if (error.response) {
          // 요청이 이루어쪗으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답
          console.error('http error status: ', error.response.status, ', data: ', error.response.data);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못함
          console.error(
            'server is not responding. server is not valid or invalid path or check network.',
            error.request,
          );
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생
          console.error('Error', error);
        }
        return Promise.reject(error);
      },
    );
  }

  public async get(url: string, config = {}) {
    const response: any = await this.instance.get(url, config);
    return response;
  }

  public async post(url: string, data = {}, config = {}) {
    const response: any = await this.instance.post(url, data, config);
    return response;
  }

  public async delete(url: string, config = {}) {
    const response: any = await this.instance.delete(url, config);
    return response;
  }

  public async put(url: string, data = {}, config = {}) {
    const response: any = await this.instance.put(url, data, config);
    return response;
  }
}

export default Axios;
