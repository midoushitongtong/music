export const save = (key: any, value: any, compare: (item: any) => boolean, maxLength?: number) => {
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

export const remove = (key: any, compare: (item: any) => boolean) => {
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
