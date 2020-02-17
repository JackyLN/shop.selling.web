import * as base from './BaseAxios';


export function get_products(callback, errorCallback) {
  const request = `/product`;

  base.fetch(request, callback, errorCallback);
}

export function get_product(query, callback, errorCallback) {
  const request = `/product/` + query;

  base.fetch(request, callback, errorCallback);
}

export function add_product(data, callback, errorCallback) {
  const request = `/product`;

  base.post(data, request, callback, errorCallback);
}

export function set_product(data, callback, errorCallback) {
  const request = `/product`;

  base.patch(data, request, callback, errorCallback);
}

export function del_product(query, callback, errorCallback) {
  const request = `/product/` + query;

  base.remove(request, callback, errorCallback);
}