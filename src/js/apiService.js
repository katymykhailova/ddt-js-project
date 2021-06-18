import axios from 'axios';
import { BASE_URL, API_KEY } from './refs/settings';
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

  async fetchTrendingMovies() {
    try {
      const response = await axios.get(`/trending/all/day?api_key=${API_KEY}`);
      const trendinMoviesData = await response.data;
      const trendinMovies = await trendinMoviesData.results;
      return trendinMovies;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchTraillerMovie() {
    try {
      const response = await axios.get(`movie/${this.id}/videos?api_key=${API_KEY}&language=en-US`);
      const modalMovie = await response.data;
      return modalMovie;
    } catch (error) {
      console.log(error);
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
      if (this.genres) return this.genres; // если ранее закешировали значение - вернуть его
      const response = await axios.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
      this.genres = {};
      response.data.genres.forEach(({ id, name }) => {
        // преобразовать в объект вида {ganreId:genreName}
        this.genres[id] = name;
      });
      return this.genres;
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
      const MAX_GENRE_LENGTH = 20;
      let genresLength = 0;
      const genres = movie.genre_ids
        .map(genreId => genresArr[genreId])
        .filter(genreName => (genresLength += genreName.length) <= MAX_GENRE_LENGTH);
      if (genresLength > MAX_GENRE_LENGTH) genres.push('others...');

      // title
      let title = movie.title;
      if (title.length > 40) {
        title = movie.title.slice(0, 37) + '...';
      }

      const release_date = movie.release_date ? movie.release_date.split('-')[0] : 'NA';

      const poster_path = movie.poster_path
        ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path
        : noposter;
      const movieUpdate = { ...movie, title, genres, release_date, poster_path };
      return movieUpdate;
    };

    const updatedMoviesarr = moviesArr.map(updateMovie);
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
