import { fetchData } from "./helpers";
import { endpoints } from "./endpoints";

export const fetchTrending = () => {
  return fetchData(endpoints.trending);
};

export const fetchPopular = () => {
  return fetchData(endpoints.popular);
};

export const fetchTopRated = () => {
  return fetchData(endpoints.topRated);
};

export const fetchUpcoming = () => {
  return fetchData(endpoints.upcoming);
};

export const searchMovies = (query) => {
  return fetchData(`${endpoints.search}?query=${query}`);
};

export const fetchMovieDetails = (id) => {
  return fetchData(endpoints.details(id));
};