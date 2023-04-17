import clearSectionContainer from './clearSectionContainer';
import { getTrendingMovies } from './getTrending';
import { getFilmsByKeywords } from './getFilmByKeywords';

// Header refs
const homeBtn = document.querySelector('#home-btn');
const libraryBtn = document.querySelector('#library-btn');
const searchForm = document.querySelector('#search-form');
const libraryButtons = document.querySelector('#library-buttons');
const logoEl = document.querySelector('#header-logo');
export const searchSectionContainer = document.querySelector(
  '.search-section__container'
);
const trendingSectionContainer = document.querySelector('.trending-container');
const paginationSection = document.querySelector('.pagination-section');

export let queryVal = '';

// Functions for header

function onLibraryBtnClick() {
  libraryBtn.classList.add('current-btn');
  homeBtn.classList.remove('current-btn');
  libraryButtons.classList.remove('visually-hidden');
  searchForm.classList.add('visually-hidden');
  logoEl.classList.add('header-logo--library');
}

function onHomeBtnClick() {
  homeBtn.classList.add('current-btn');
  libraryBtn.classList.remove('current-btn');
  libraryButtons.classList.add('visually-hidden');
  searchForm.classList.remove('visually-hidden');
  logoEl.classList.remove('header-logo--library');

  trendingSectionContainer.classList.remove('visually-hidden');
  paginationSection.classList.remove('visually-hidden');
  clearSectionContainer(searchSectionContainer);
  getTrendingMovies();
}

function onFormSubmit(e) {
  e.preventDefault();
  queryVal = e.currentTarget.elements.searchQuery.value;
  trendingSectionContainer.classList.add('visually-hidden');
  paginationSection.classList.add('visually-hidden');
  clearSectionContainer(searchSectionContainer);
  getFilmsByKeywords(1);
}

searchForm.addEventListener('submit', onFormSubmit);
libraryBtn.addEventListener('click', onLibraryBtnClick);
homeBtn.addEventListener('click', onHomeBtnClick);
