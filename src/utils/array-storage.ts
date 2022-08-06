export const save = (key: any, value: any, compare: (item: any) => boolean, maxLength?: number) => {
  const arrayValue: any[] = get(key);

  const index = arrayValue.findIndex(compare);

  // 防止重复添加
  if (index === -1) {
    arrayValue.push(value);
  }

  // 超出最大长度, 移除最前面的元素
  if (maxLength && arrayValue.length > maxLength) {
    arrayValue.shift();
  }

  localStorage.setItem(key, JSON.stringify(arrayValue));

  return arrayValue;
};

export const saveUnshift = (
  key: any,
  value: any,
  compare: (item: any) => boolean,
  maxLength?: number
) => {
  const arrayValue: any[] = get(key);

  const index = arrayValue.findIndex(compare);

  // 如果已经存在, 先移除
  if (index !== -1) {
    arrayValue.splice(index, 1);
  }

  // 放到数组最前端
  arrayValue.unshift(value);

  // 超出最大长度, 移除最后面的元素
  if (maxLength && arrayValue.length > maxLength) {
    arrayValue.pop();
  }

  localStorage.setItem(key, JSON.stringify(arrayValue));

  return arrayValue;
};

export const remove = (key: any, compare: (item: any) => boolean) => {
  const arrayValue: any[] = get(key);

  const index = arrayValue.findIndex(compare);

  // 从数组移除某个元素
  if (index !== -1) {
    arrayValue.splice(index, 1);
  }

  localStorage.setItem(key, JSON.stringify(arrayValue));

  return arrayValue;
};

export const get = (key: any) => {
  // @ts-ignore
  let arrayValue: any[] = [];

  const stringValue = localStorage.getItem(key);
  if (stringValue) {
    try {
      arrayValue = JSON.parse(stringValue);
    } catch (error) {
      console.log('解析 json 失败');
    }
  }

  return arrayValue;
};

export const clear = (key: any) => {
  localStorage.removeItem(key);
  return [];
};
