import axios, { Method, AxiosError } from 'axios';
import { API_HOST } from '@/constants/api';

interface Ioptions {
  url: string;
  data?: any;
  headers?: any;
  method?: Method;
}

const request = async (options: Ioptions) => {
  const { url, data = {}, headers = {}, method = 'get' } = options;
  const useURLParam = ['GET', 'DELETE'].indexOf(method.toUpperCase()) >= 0;
  try {
    const res = await axios({
      url: `${API_HOST}/${url}`,
      data: !useURLParam ? data : undefined,
      params: useURLParam ? data : undefined,
      method,
      headers: {
        ...headers,
      },
    });

    if (res.data.code !== 0) {
      const err = new Error(res.data.msg);
      console.log('request failed:', options, err);
      return res;
    }
    console.log('request success:', url, res);
    return res;
  } catch (err) {
    console.log('request failed:', options, err);
    // throw err;
  }
};

export default request;
