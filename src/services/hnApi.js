import axios from "axios";

const baseUrl = `https://hn.algolia.com/api/v1/`;
const searchUrl = `${baseUrl}search?query=`;
const countUrl = `${baseUrl}users/`;

export const getSearchResult = async (query) => {
  return await axios.get(searchUrl + query).then(({ data }) => data);
};

export const getCount = async (id) => {
  return await axios.get(countUrl + id).then(({ data }) => data);
};
