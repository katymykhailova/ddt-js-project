import axios from 'axios';
import { BASE_URL, API_KEY } from './refs/settingsApi';
import noposter from '../images/no-poster.png';
axios.defaults.baseURL = BASE_URL;

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalPages = 1;
    this.id = '';
  }

  async fetchMoviesPagination() {
    if (this.searchQuery !== '') {
      return await this.fetchMoviesSearchQuery();
    } else {
      return await this.fetchPopularMovies();
    }
  }

  async fetchPopularMovies() {
    try {
      const response = await axios.get(
        // `/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${this.page}`,
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`,
      );
      const popularMoviesData = await response.data;
      const popularMovies = await popularMoviesData.results;
      const normalizedMovies = await this.fetchNormalizer(popularMovies);
      this.totalPages = popularMoviesData.total_pages;
      return normalizedMovies;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchMoviesSearchQuery() {
    try {
      const response = await axios.get(
        `/search/movie?api_key=${API_KEY}&page=${this.page}&language=en&query='${this.searchQuery}'`,
      );
      const popularMoviesData = await response.data;
      const popularMovies = await popularMoviesData.results;
      const normalizedMovies = await this.fetchNormalizer(popularMovies);
      this.totalPages = popularMoviesData.total_pages;
      return normalizedMovies;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchGenres() {
    try {
      const response = await axios.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
      const genres = await response.data.genres;
      return genres;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchMovieDetails() {
    try {
      const response = await axios.get(`movie/${this.id}?api_key=${API_KEY}&language=en-US`);
      const modalMovie = await response.data;
      // console.log(response.data);
      return modalMovie;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchNormalizer(fetchedData) {
    const moviesArr = await fetchedData;
    const genresArr = await this.fetchGenres();

    const updateMovie = movie => {
      let genres = [];
      const genresIdArr = movie.genre_ids;

      genresIdArr.forEach(id => {
        const genreName = genresArr.find(gener => id === gener.id).name;
        genres.push(genreName);
      });

      28;
      let genresStr = genres.join(',');
      let i = 0;
      if (genresStr.length > 28) {
        do {
          genres.splice(genres.length - 1, 2);
        } while (genres.join(',').length > 20);
        genres.push('others...');
      }

      const release_date = movie.release_date ? movie.release_date.split('-')[0] : 'NA';

      const poster_path = movie.poster_path
        ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path
        : noposter;
      const movieUpdate = { ...movie, genres, release_date, poster_path };
      return movieUpdate;
    };

    const updatedMoviesarr = moviesArr.map(movie => updateMovie(movie));
    return updatedMoviesarr;
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
