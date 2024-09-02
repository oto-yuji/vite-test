import axiosInstance from './axiosInstance';
import { Movie } from './types';

export const getMovieList = () => {
    return axiosInstance.get<Movie[]>('/api/movies/');
};

export const createMovie = (movie: Movie) => {
    return axiosInstance.post('/api/movies/', movie);
};

export const updateMovie = (id: number, movie: Movie) => {
    return axiosInstance.patch(`/api/movies/${id}/`, movie);
};

export const deleteMovie = (id: number) => {
    return axiosInstance.delete(`/api/movies/${id}/`);
};

export const searchMovie = (query: string) => {
    return axiosInstance.get(`/api/movies/?search=${query}`);
};
