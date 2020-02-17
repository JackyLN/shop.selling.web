import * as base from './BaseAxios';


export function get_orders(callback, errorCallback) {
  const request = `/order`;

  base.fetch(request, callback, errorCallback);
}

export function get_order(query, callback, errorCallback) {
  const request = `/order/` + query;

  base.fetch(request, callback, errorCallback);
}

export function add_order(data, callback, errorCallback) {
  const request = `/order`;

  base.post(data, request, callback, errorCallback);
}

export function set_order(data, callback, errorCallback) {
  const request = `/order`;

  base.patch(data, request, callback, errorCallback);
}

export function del_order(query, callback, errorCallback) {
  const request = `/order/` + query;

  base.remove(request, callback, errorCallback);
}