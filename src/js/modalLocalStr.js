import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function modalLocalStr () {
const API_KEY = 'd66303a9f2f21ddca222463dbeed564f';
const WATCHED_LS = "watched";
const QUEUE_LS = "queue";

let fileWatchedLS = {};
let fileQueueLS = {};


const filmID = document.querySelector('.modal-text-content-id');
const watchedBtn001 = document.querySelector('.modal-buttons-one');
const queueBtn001 = document.querySelector('.modal-buttons-two');


watchedBtn001.addEventListener('click', addWatched);

queueBtn001.addEventListener('click', addQueue);

<<<<<<< Updated upstream
watchedBtn.addEventListener('click', addWatched);
queueBtn.addEventListener('click', addQueue);
=======
>>>>>>> Stashed changes



function addWatched () {
    getFilm(filmID.textContent).then(getDataForLocalStr).then(addToWatchedLS).catch(console.log("error"))
}

function addQueue () {
    getFilm(filmID.textContent).then(getDataForLocalStr).then(addToQueueLS).catch(console.log("error"))
}

function addToWatchedLS (result) {
    if (localStorage.getItem(WATCHED_LS)) {
        fileWatchedLS = {...JSON.parse(localStorage.getItem(WATCHED_LS))};
        fileWatchedLS[result.id] = result;
        localStorage.setItem(WATCHED_LS, JSON.stringify(fileWatchedLS));
        Notify.info(`${result.title}: has been watched.`)
        
        return;
    }
    
    fileWatchedLS[result.id] = result;
    localStorage.setItem(WATCHED_LS, JSON.stringify(fileWatchedLS));

    Notify.info(`${result.title} has been watched.`)
    return;
}

function addToQueueLS (result) {
    if (localStorage.getItem(QUEUE_LS)) {
        fileQueueLS = {...JSON.parse(localStorage.getItem(QUEUE_LS))};
        fileQueueLS[result.id] = result;
        localStorage.setItem(QUEUE_LS, JSON.stringify(fileQueueLS));
        Notify.info(`${result.title}: is added to the watch queue.`)
        
        return;
    }
    
    fileQueueLS[result.id] = result;
    localStorage.setItem(QUEUE_LS, JSON.stringify(fileQueueLS));

    Notify.info(`${result.title}: is added to the watch queue.`)
    return;
}

function getDataForLocalStr(data){
    const { title, poster_path, release_date, id, genres } = data;
    return dataForLS = {
        title, 
        poster_path, 
        release_date, 
        id, 
        genres
    }    
}

function getFilm(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    .then(response => {
        if (!response.ok) {
            throw new Error()
        }

<<<<<<< Updated upstream
        return response.json()
    })
}
=======
    return response.json();
  });
}
}
>>>>>>> Stashed changes
