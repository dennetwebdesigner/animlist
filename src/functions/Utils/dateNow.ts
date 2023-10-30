export function dateNow() {
  const date = new Date();
  const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const min =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${day}-${month}-${year} ${hour}:${min}`;
}
