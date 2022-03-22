export default function formatUrlParam(search: string) {
  const queryArr = search.startsWith('?') ? search.substring(1).split('&') : search.split('&');

  const resObj: { [key in string]: any } = {};
  queryArr.forEach(item => {
    const [key, value] = item.split('=');
    resObj[key] = Number(decodeURIComponent(value))
      ? Number(decodeURIComponent(value))
      : decodeURIComponent(value);
  });
  return resObj;
}
