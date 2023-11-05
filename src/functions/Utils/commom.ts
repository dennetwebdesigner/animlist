export const host_root = `${process.env.NEXT_PUBLIC_HOST}`;

type connectApiData = any;

export async function requestApi({
  url,
  method,
  data,
}: {
  url: string;
  method: string;
  data?: connectApiData;
}) {
  const body = data ? JSON.stringify(data) : null;
  console.log(body);
  const response = await fetch(`${host_root}/api/${url}`, {
    method,
    body,
  });
  return await response.json();
}
