import * as base from './BaseAxios';


export function get_customers(callback, errorCallback) {
  const request = `/customer`;

  base.fetch(request, callback, errorCallback);
}

export function get_customer(query, callback, errorCallback) {
  const request = `/customer/` + query;

  base.fetch(request, callback, errorCallback);
}

export function add_customer(data, callback, errorCallback) {
  const request = `/customer`;

  base.post(data, request, callback, errorCallback);
}

export function set_customer(data, callback, errorCallback) {
  const request = `/customer`;

  base.patch(data, request, callback, errorCallback);
}

export function del_customer(query, callback, errorCallback) {
  const request = `/customer/` + query;

  base.remove(request, callback, errorCallback);
}