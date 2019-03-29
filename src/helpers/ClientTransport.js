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

const checkStatus = {
  error: (errorCode) => {
    if (eTypes[errorCode] === undefined) {
      const { commit, ...info } = eTypes.UNDEFINDED_ERROR;
      throw new FetchError(
        commit,
        info,
      );
    } else {
      const { commit, ...info } = eTypes[errorCode];
      throw new FetchError(
        commit,
        {
          ...info,
        });
    }
  },
  mr: (response) => {
    const { values, success, message } = response;
    if (success) {
      return values;
    }
    throw new FetchError(
      'error/SERVER_ERROR',
      {
        message: '',
        txt: message,
      });
    // checkStatus.error(errorCode);
    // return null;
  },
  treemall: (response) => {
    const { values, success, message } = response;
    if (success) {
      const { status_id: statusId, result, status_desc: statusDesc } = values;
      if (statusId === 'E000') {
        return result;
      }
      throw new FetchError(
        'error/TREEMALL_ERROR',
        {
          statusId,
          statusDesc,
        });
    }
    throw new FetchError(
      'error/SERVER_ERROR',
      {
        message: '',
        txt: message,
      });
    // return null;
  },
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
      const { thirdParty = 'mr' } = request;
      const response = await this.instance(request);
      return checkStatus[thirdParty](response.data);
    } catch (e) {
      if (e.response && e.response.status !== 200) {
        const { commit, ...info } = eTypes.FETCH_ERROR;
        throw new FetchError(commit,
          {
            ...info,
          });
      } else if (e.message === 'Network Error') {
        const { commit, ...info } = eTypes.NETWORK_ERROR;
        throw new FetchError(commit,
          {
            ...info,
          });
      } else {
        const { commit, info } = e;
        throw new FetchError(
          commit,
          info,
        );
      }
    }
  }
  async fetchAll(requests) {
    try {
      const responses = await Promise.all(requests.map(request => this.instance(request)));
      return responses.reduce((accumulator, currentValue) => {
        const { thirdParty = 'mr' } = currentValue;
        return [
          ...accumulator,
          checkStatus[thirdParty](currentValue.data),
        ];
      }, []);
    } catch (e) {
      if (e.response && e.response.status !== 200) {
        const { commit, ...info } = eTypes.FETCH_ERROR;
        throw new FetchError(commit,
          {
            ...info,
          });
      } else if (e.message === 'Network Error') {
        const { commit, ...info } = eTypes.NETWORK_ERROR;
        throw new FetchError(commit,
          {
            ...info,
          });
      } else {
        const { commit, info } = e;
        throw new FetchError(
          commit,
          info,
        );
      }
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
