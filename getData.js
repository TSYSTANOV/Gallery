import { ACCESS_KEY, API_URL_PHOTOS } from "./const.js";

export const getData = ({page = 1, count = 30,id}) => {
  const urls = new URL(API_URL_PHOTOS)

  urls.searchParams.set('client_id', ACCESS_KEY)
  if(page && count){
  urls.searchParams.append('per_page', count)
  urls.searchParams.append('page', page)
  }
  if(id){
    urls.pathname += `/${id}`
  }

  return fetch(urls)
    .then((response) => response.json())
    .then((response) => response);
};
