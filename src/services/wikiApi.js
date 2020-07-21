import axios from "axios";

const baseUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&`;
const searchUrl = `${baseUrl}search=`;

export const getSearchResult = async (query) => {
  return await axios.get(searchUrl + query).then(({ data }) => data);
};
