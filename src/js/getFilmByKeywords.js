import fetchFilmByKeywords from './fetchFilmByKeywords';
import { getGenres, getAllGenres } from './getGenres';
import { searchSectionContainer } from './header';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { makePagination } from './pagination';

export async function getFilmsByKeywords(page) {
  try {
    const respons = await fetchFilmByKeywords(page);
    if (respons.data.total_results === 0) {
      return Notify.failure(
        'Search result not successful. Enter the correct movie name.'
      );
    }
    const allGenres = await getAllGenres();
    appendFilms(respons.data.results, allGenres);
    makePagination(respons.data.total_pages, page, getFilmsByKeywords);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } catch (error) {
    Notify.failure(error.message);
    throw error;
  }
}
function appendFilms(films, allGenres) {
  const filmsItem = films
    .map(film => {
      return `
          <div class="search-section__item" data-id="${film.id}">
            <img 
            class="search-section__image"
            src="https://image.tmdb.org/t/p/w500${film.poster_path}" 
            alt="${film.title}" 
            loading="lazy"          
            />
            <p class="search-section__title">${film.title}</p>
            <p class="search-section__discription">${getGenres(
              film.genre_ids,
              allGenres
            )} | ${film.release_date.slice(0, 4)}</p>
          </div>
        `;
    })
    .join('');
  searchSectionContainer.innerHTML = filmsItem;
}
