import axios from 'axios';
import { BASE_URL, API_KEY } from './refs/settingsApi';
axios.defaults.baseURL = BASE_URL;

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.currentPage = 1;
  }

  async fetchPopularMovies() {
    try {
      const response = await axios.get(
        `/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${this.page}`,
      );
      console.log(response);
      const popularMovies = await response.data.results;
      const normalizedMovies = await this.fetchNormalizer(popularMovies);
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

  async fetchNormalizer(fetchedData) {
    const moviesArr = await fetchedData;
    const genresArr = await this.fetchGenres();

    //Функция, которая обновляет информацию о фильме и добавляя имена жанров
    const updateMovie = movie => {
      const genres = [];
      const genresIdArr = movie.genre_ids;

      // Проходимся по массиву id жанров и добавляем в новый массив имена жанров соответсвующие id
      genresIdArr.forEach(id => {
        const genreName = genresArr.find(gener => id === gener.id).name;
        genres.push(genreName);
      });

      //Обрезаем дату
      const release_date = movie.release_date ? movie.release_date.split('-')[0] : 'NA';

      // Подгружаем noPosterImg если с бэкэнда не прихожит картинка
      const poster_path = movie.poster_path
        ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path
        : noposter;
      const movieUpdate = { ...movie, genres, release_date, poster_path };
      return movieUpdate;
    };

    // Обновляем информацию фильмов в массиве
    const updatedMoviesarr = moviesArr.map(movie => updateMovie(movie));
    return updatedMoviesarr;
  }
}
