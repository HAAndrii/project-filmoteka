import getTrendingMovies from "./getTrending";
import { renderWatchedfilm } from "./renderLocalStr";
// Header refs
const homeBtn = document.querySelector('#home-btn');
const libraryBtn = document.querySelector('#library-btn');
const searchForm = document.querySelector('#search-form');
const libraryButtons = document.querySelector('#library-buttons');
const logoEl = document.querySelector('#header-logo');
const buttons = document.querySelector('#pagination-buttons');
// Functions for header

function onLibraryBtnClick() {
  libraryBtn.classList.add('current-btn');
  homeBtn.classList.remove('current-btn');
  libraryButtons.classList.remove('visually-hidden');
  searchForm.classList.add('visually-hidden');
  logoEl.classList.add('header-logo--library');
  buttons.style.display = 'none'
  renderWatchedfilm()
}

function onHomeBtnClick() {
  homeBtn.classList.add('current-btn');
  libraryBtn.classList.remove('current-btn');
  libraryButtons.classList.add('visually-hidden');
  searchForm.classList.remove('visually-hidden');
  logoEl.classList.remove('header-logo--library');
  buttons.style.display = 'flex'
  getTrendingMovies()
}

function onFormSubmit(e) {
  e.preventDefault();
  const inputValue = e.currentTarget.elements.searchQuery.value;
  console.log(inputValue);
}

searchForm.addEventListener('submit', onFormSubmit);
libraryBtn.addEventListener('click', onLibraryBtnClick);
homeBtn.addEventListener('click', onHomeBtnClick);
