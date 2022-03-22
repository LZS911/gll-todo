import { cloneDeep } from 'lodash';
import { isArray, isObject, isString, JSTypeTag } from './typeTools';

export const trimDeep = (data: unknown): unknown => {
  const tempData = cloneDeep(data);

  if (isString(tempData)) {
    return tempData.trim();
  }

  if (isObject(tempData)) {
    Object.keys(tempData).forEach((key) => {
      if (key.includes('password')) {
        return;
      }

      const currentValueType = Object.prototype.toString.call(tempData[key]);

      if (currentValueType === JSTypeTag.String) {
        tempData[key] = tempData[key].trim();
      } else if (currentValueType === JSTypeTag.Object) {
        tempData[key] = trimDeep(tempData[key]);
      } else if (currentValueType === JSTypeTag.Array) {
        tempData[key] = trimDeep(tempData[key]);
      }
    });
  } else if (isArray(tempData)) {
    return tempData.map((item: unknown) => trimDeep(item));
  }

  return tempData;
};
