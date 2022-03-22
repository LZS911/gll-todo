/* eslint-disable @typescript-eslint/no-explicit-any */
export const JSTypeTag = {
  Object: '[object Object]',
  String: '[object String]',
  Undefined: '[object Undefined]',
  Null: '[object Null]',
  Array: '[object Array]',
  Promise: '[object Promise]',
  AsyncFunction: '[object AsyncFunction]',
  Set: '[object Set]',
  WeakSet: '[object WeakSet]',
  Map: '[object Map]',
  WeakMap: '[object WeakMap]',
  Number: '[object Number]',
  Boolean: '[object Boolean]',
  Symbol: '[object Symbol]',
  Function: '[object Function]',
  Date: '[object Date]',
};
export type CommonObject = { [key in string]: any };

export const isString = (data: unknown): data is string => {
  const currentDataType = Object.prototype.toString.call(data);
  return currentDataType === JSTypeTag.String;
};

export const isObject = (data: unknown): data is CommonObject => {
  const currentDataType = Object.prototype.toString.call(data);
  return currentDataType === JSTypeTag.Object;
};
export const isArray = <T>(data: unknown): data is Array<T> => {
  const currentDataType = Object.prototype.toString.call(data);
  return currentDataType === JSTypeTag.Array;
};
