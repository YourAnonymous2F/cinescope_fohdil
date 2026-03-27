export const endpoints = {
  trending: "/trending/movie/week",
  genres: "/genre/movie/list",
  search: "/search/movie",
  discover: "/discover/movie",
  movieDetails: (id) => `/movie/${id}`,
  credits: (id) => `/movie/${id}/credits`,
  similar: (id) => `/movie/${id}/similar`,
};