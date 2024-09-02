import { Movie } from './types';

export const getRandomMovie = (movies: Movie[]): Movie => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};
