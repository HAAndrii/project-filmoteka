import axios from "axios"


const url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=d66303a9f2f21ddca222463dbeed564f'
const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d66303a9f2f21ddca222463dbeed564f&language=en-US'
const container = document.querySelector('.trending-container')
const buttons = document.querySelector('#buttons')
const pagination = document.querySelector('#paging')
const prevBtn = document.querySelector('#prev')

let currentPage = 1


function paginatorCreate(data, page) {  
  pagination.innerHTML = ''
  let buttonsArray = []
  const { total_pages } = data
  const firstBtn = document.createElement('button')
  const lastBtn = document.createElement('button')
  firstBtn.classList.add('pagination__buttons')
  lastBtn.classList.add('pagination__buttons')
  firstBtn.textContent = '1'
  lastBtn.textContent = total_pages
  pagination.append(firstBtn)
  if(!page || page === 1) {
    firstBtn.classList.add('currentPage')
  } else if (page === total_pages) {
    lastBtn.classList.add('currentPage')
  }
  if(!page || page < 4){
    for (let i = 2; i < 7; i++) {
      const btn = document.createElement('button')
      btn.textContent = i
      btn.classList.add(`pagination__button${i}`, 'pagination__buttons')
      buttonsArray.push(btn)
    }

  } else if (page <= 994) {
    for(let i = (page - 2); i <= (page + 2); i++) {
      const btn = document.createElement('button')
      btn.textContent = i
      btn.classList.add(`pagination__button${i}`, 'pagination__buttons')
      buttonsArray.push(btn)
    }
  } else if (page > 994) {
    for(let i = 994; i <= 999; i++) {
      const btn = document.createElement('button')
      btn.textContent = i
      btn.classList.add(`pagination__button${i}`, 'pagination__buttons')
      buttonsArray.push(btn)
    }
  }
  pagination.append(...buttonsArray)
  pagination.append(lastBtn)
}

buttons.addEventListener('click', e => {
  if(e.target.textContent === 'Next') {
    ++currentPage
    container.innerHTML = ''
    getTrendingMovies(currentPage)
  } else if (e.target.textContent === 'Prev' && currentPage > 1) {
    --currentPage
    container.innerHTML = ''
    getTrendingMovies(currentPage)
  }
})

pagination.addEventListener('click', e => {
  if (e.target.textContent === currentPage) {
    return
  } else {
    currentPage = Number.parseInt(e.target.textContent)
    container.innerHTML = ''
    getTrendingMovies(currentPage)
  }
})

async function getTrendingMovies(page) {
  const options = {
    params: {
      page
    }
  }
  try {
    const response = await axios.get(url, options)
    const result = response.data.results
    const data = response.data
    const genresResponse = await axios.get(genresUrl)
    const genresArray = genresResponse.data.genres
    result.forEach(el => {
      el.genres = []
      el.genre_ids.map(el2 => {
        for (let i = 0; i < genresArray.length; i++) {
          if (el2 === genresArray[i].id) {
            el.genres.push(genresArray[i].name)
          }
          
        }
      })
    });
    appendTrendingGallery(result)
    paginatorCreate(data, page)
    const currentPage = document.querySelector(`.pagination__button${page}`)
    currentPage.classList.add('currentPage')
    window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
  } catch (error) {
    console.log(error);
  }
}

function appendTrendingGallery(result) {
  container.insertAdjacentHTML(
    'afterbegin',
    result
      .map(({title, poster_path, release_date, id, genres}) => {
        const releaseDate = release_date.slice(0, 4)
        return `
          <div class="movie-card" data-id="${id}">
            <img 
            class="movie__image"
            src="https://image.tmdb.org/t/p/w500${poster_path}" 
            alt="${title}" 
            loading="lazy"          
            />
            <p class="movie__title">${title}</p>
            <p class="movie__genresAndReleaseDate">${genres} | ${releaseDate}</p>
          </div>
        `;
      })
      .join(''),
  );

}

getTrendingMovies()

