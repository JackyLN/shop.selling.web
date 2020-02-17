import axios from 'axios';
import Config from 'Config';

const instance = axios.create({
  baseURL: Config.serverUrl,
});

function validateToken(callback) {
  callback();
}

export function fetch(request, callback, errorCallback) {
  validateToken(() => {
    instance.get(request, {})
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        errorCallback(error);
      });
  });
}

export function post(data, request, callback, errorCallback) {
  validateToken(() => {
    instance.post(request, data, {})
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        errorCallback(error);
      });
  });
}

export function patch(data, request, callback, errorCallback) {
  validateToken(() => {
    instance.post(request, data, {})
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        errorCallback(error);
      });
  });
}

export function remove(request, callback, errorCallback) {
  validateToken(() => {
    instance.delete(request, {})
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        errorCallback(error);
      });
  })
}