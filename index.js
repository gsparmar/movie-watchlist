const moviesList = document.getElementById('movies-list');
const input = document.getElementById('input-movie');
const exploringMessage = document.getElementById('start-exploring-message');
const searchMessage = document.getElementById('try-search-again');
const moviesForm = document.getElementById('movies-form');
let watchlistMovies = [];

if (localStorage.getItem('moviesArray')) {
  watchlistMovies = JSON.parse(localStorage.getItem('moviesArray'));
}

moviesForm.addEventListener('submit', function (e) {
  e.preventDefault();
  moviesList.innerHTML = '';
  e.preventDefault();
  searchMessage.style.display = 'none';
  exploringMessage.style.display = 'none';
  moviesList.style.display = 'block';
  fetch(`https://www.omdbapi.com/?apikey=4d327b62&s=${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      searchAllMovies(data.Search);
    });
});

document.addEventListener('click', function (e) {
  if (e.target.dataset.movie) {
    document.getElementById(e.target.dataset.movie).innerHTML = `
            <i class="fa-solid fa-circle-check" data-movie="${e.target.dataset.movie}"></i>
            <p class="ck-movie" data-movie="${e.target.dataset.movie}">Added</p>
        `;

    if (!watchlistMovies.includes(e.target.dataset.movie)) {
      watchlistMovies.push(e.target.dataset.movie);
    }
    localStorage.setItem('moviesArray', JSON.stringify(watchlistMovies));
  }
});

function searchAllMovies(data) {
  if (data) {
    for (let movie of data) {
      fetch(`https://www.omdbapi.com/?apikey=4d327b62&t=${movie.Title}`)
        .then((res) => res.json())
        .then((mov) => {
          renderMovie(mov);
        });
    }
  } else {
    searchMessage.style.display = 'block';
    moviesList.style.display = 'none';
  }
}

function renderMovie(movie) {
  moviesList.innerHTML += `
    <div class="movie-container">
        <div class="movie-image">
            <img src="${movie.Poster}">
        </div>
        <div class="movie-information">
            <div class="title-score">
                <p>${movie.Title}</p>
                <i class="fa-solid fa-star">${movie.imdbRating}</i>
            </div>
            <div class="genre-length">
                <p>${movie.Runtime}</p>
                <p>${movie.Genre}</p>
                <div class="watchlist" data-movie="${movie.imdbID}" id="${movie.imdbID}">
                    <i class="fa-solid fa-circle-plus" data-movie="${movie.imdbID}"></i>
                    <p data-movie="${movie.imdbID}">Watchlist</p>
                </div>
            </div>
            <div class="description">
                <p>${movie.Plot}</p>
            </div>
        </div>
    </div>
    `;
}
