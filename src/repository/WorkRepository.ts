import { requestApi } from "@/functions/Utils/commom";

type WorksType = {
  name: string;
  description: string;
  img: string;
  categories: string;
};

export async function works_store(data: WorksType) {
  const response = await requestApi({ url: "works", method: "POST", data });
  return response;
}

export async function works_by_name(name: string) {
  const response = await requestApi({
    url: `works/name/${name}`,
    method: "GET",
  });
  return response;
}

export async function works_by_id(id: string) {
  const response = await requestApi({
    url: `works/id/${id}`,
    method: "GET",
  });

  if (response.categories)
    response.categories = JSON.parse(response.categories);

  return response;
}

export async function works_by_user_list(id: string, user: string) {
  const response = await requestApi({
    url: `works/id/${id}`,
    method: "POST",
    data: {
      user,
    },
  });

  if (response.categories)
    response.categories = JSON.parse(response.categories);

  return response;
}

export async function works_update(id: string, data: WorksType) {
  const response = await requestApi({
    url: `works/id/${id}`,
    method: "PUT",
    data,
  });
  return response;
}
