import dayjs from 'dayjs';

export const getYearsList = () => {
  const now = dayjs().format('YYYY');
  const start = 1895;

  const result = [];
  for(let i = now; i >= start; i--) {
    result.push(i);
  }

  return result;
}