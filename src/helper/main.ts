export function parseDBError(error: any) {
  const index = error?.message?.indexOf(':');
  let message = error?.message;
  if (index >= 0) {
    message = error.message.substr(index + 1);
  }
  return message;
}

export function clearNullField<T>(obj: T) {
  const keys = Object.keys(obj);
  const result = {} as T;
  if (keys.length >= 1) {
    keys.forEach((item) => {
      if (obj[item]) {
        result[item] = obj[item];
      }
    });
    return result;
  }
  return obj;
}
