const API_KEY = 'api_key=45f31e9ac804875663bd3354d9c20d50';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url){

  fetch(url).then(res => res.json()).then(data => {
    console.log(data.results)
    showMovies(data.results);
  })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div>
          <img src="${IMG_URL+poster_path}" alt="${title}">
          <div class="movie-info">
              <h3>${title}</h3>
          </div>
          <div class="overview">
            <button id="favButton" onClick="saveAsFavoriteMovies(event)" value="${title}">Favorite ♥</button>
              <h3>Details</h3> 
              ${overview}
          </div>
        </div>
        
        `

        main.appendChild(movieEl);
  })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const searchTerm = search.value;
  
    if (searchTerm) {
      getMovies(searchURL+'&query='+searchTerm)
    } else {
      getMovies(API_URL);
    }
})

function getFavoriteMovies() {
  const arrFavorite = JSON.parse(localStorage.getItem('favorite'));

  return arrFavorite;
}

function saveAsFavoriteMovies(event) {

  const { value } = event.target;
  let favoriteMovies = getFavoriteMovies();
  if (!favoriteMovies) {
    favoriteMovies = [];
  }

  if (!favoriteMovies.includes(value)) {
    favoriteMovies.push(value);
  }

  localStorage.setItem('favorite', JSON.stringify(favoriteMovies));
  alert(`${value} successfully added to favorite movies list!`);
}

function showFavoriteList() {
    main.innerHTML = '';
    const favoriteMovies = getFavoriteMovies();

    for (let i = 0; i < favoriteMovies.length; i++) {
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
      <div>
        <h3 class="fav-movies-list-h3">${favoriteMovies[i]}</h3>               
        <button value="${favoriteMovies[i]}" onClick="removeFavoriteMovies(event)" id="favButton" class="fav-movies-list">Remove</button>
      </div>
      `

      main.appendChild(movieEl);
    }
}

function removeFavoriteMovies(event) {

  const { value } = event.target
  const favoriteMovies = getFavoriteMovies();
  const updatedFavoriteMovies = favoriteMovies.filter( movie => movie !== value);
  localStorage.setItem('favorite', JSON.stringify(updatedFavoriteMovies));

  showFavoriteList();
}