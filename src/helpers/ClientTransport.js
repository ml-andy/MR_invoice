import axios from 'axios';
import * as eTypes from '@/constant/apiErrorTypes';

/**
 * @desc 自定義 Error
 * @param {commit} string - commit type
 * @param {info} string - 錯誤資訊
 */
function FetchError(commit, info) {
  this.commit = commit;
  this.info = info;
}
FetchError.prototype = new Error();
FetchError.prototype.constructor = FetchError;

const checkStatus = (response) => {
  const { values, errorCode, success, message } = response;
  if (success) {
    return values;
  }
  throw new FetchError(
    'error/EDIT_ERROR',
    {
      errorCode,
      message,
    });
};

const errorHandle = (e) => {
  if (e.response && e.response.status !== 200) {
    const { commit, ...info } = eTypes.FETCH_ERROR;
    return new FetchError(commit,
      {
        ...info,
      });
  } else if (e.message === 'Network Error') {
    const { commit, ...info } = eTypes.NETWORK_ERROR;
    return new FetchError(commit,
      {
        ...info,
        message: `status: ${e.response.status}, message:${e.message}`,
      });
  }
  const { commit, info } = e;
  return new FetchError(
    commit,
    info,
  );
};

const editMethod = (requests) => {
  if (!process.jsonSserver) return requests;
  const isArray = Array.isArray(requests);
  switch (isArray) {
    case true:
      return requests.map(data => ({
        ...data,
        method: 'get',
      }));
    default:
      return {
        ...requests,
        method: 'get',
      };
  }
};

class ClientTransport {
  constructor({ baseURL = '', headers = {}, timeout = 20000 }) {
    this.instance = axios.create({
      baseURL,
      headers,
      timeout,
    });
  }
  updateHeaders = (headers) => {
    this.instance.defaults.headers = {
      ...headers,
    };
  }
  updateBaseURL = (url) => {
    this.instance.defaults.baseURL = url;
  }
  async fetchOne(request) {
    try {
      const response = await this.instance(request);
      return checkStatus(response.data);
    } catch (e) {
      throw errorHandle(e);
    }
  }
  async fetchAll(requests) {
    try {
      const responses = await Promise.all(requests.map(request => this.instance(request)));
      return responses.reduce((accumulator, currentValue) => ([
        ...accumulator,
        checkStatus(currentValue.data),
      ]), []);
    } catch (e) {
      throw errorHandle(e);
    }
  }
  fetch(requests) {
    const reqs = editMethod(requests);
    if (Array.isArray(requests)) {
      return this.fetchAll(reqs);
    }
    return this.fetchOne(reqs);
  }
}

export default new ClientTransport({});
