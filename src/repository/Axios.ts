import axios, { AxiosInstance } from 'axios';

class Axios {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create();
    this.instance.defaults.baseURL = 'https://ably-frontend-assignment-server.vercel.app/';
    this.instance.defaults.headers.common['Content-Type'] = 'applcation/json';

    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  public async get(url: string, config = {}) {
    const response = await this.instance.get(url, config);
    return response;
  }

  public async post(url: string, data = {}, config = {}) {
    const response = await this.instance.post(url, data, config);
    return response;
  }

  public async delete(url: string, config = {}) {
    const response = await this.instance.delete(url, config);
    return response;
  }

  public async put(url: string, data = {}, config = {}) {
    const response = await this.instance.put(url, data, config);
    return response;
  }
}

export default Axios;
