export const formatTime = (interval: number) => {
  interval = interval | 0;
  const minute = (((interval / 60) | 0) + '').padStart(2, '0');
  const second = ((interval % 60) + '').padStart(2, '0');
  return `${minute}:${second}`;
};
