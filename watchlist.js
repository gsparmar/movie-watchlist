const watchlist = document.getElementById('watchlist-list');
const emptyMessage = document.getElementById('empty-message');
let watchlistMovies = JSON.parse(localStorage.getItem('moviesArray'));

document.addEventListener('click', function (e) {
  if (e.target.dataset.movie) {
    watchlistMovies = watchlistMovies.filter(
      (data) => data != e.target.dataset.movie
    );
    localStorage.setItem('moviesArray', JSON.stringify(watchlistMovies));
    watchlist.innerHTML = '';
    if (watchlistMovies.length) {
      watchlist.style.display = 'block';
      emptyMessage.style.display = 'none';
      renderMovies(watchlistMovies);
    } else {
      emptyMessage.style.display = 'block';
      watchlist.style.display = 'none';
    }
  }
});

function renderMovies(idArray) {
  for (let movieId of idArray) {
    fetch(`https://www.omdbapi.com/?apikey=4d327b62&i=${movieId}`)
      .then((res) => res.json())
      .then((movie) => {
        console.log(movie);
        watchlist.innerHTML += `
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
                <div class="watchlist" data-movie="${movie.imdbID}">
                    <i class="fa-solid fa-circle-minus" data-movie="${movie.imdbID}"></i>
                    <p data-movie="${movie.imdbID}">Remove</p>
                </div>
            </div>
            <div class="description">
                <p>${movie.Plot}</p>
            </div>
        </div>
    </div>
                `;
      });
  }
}
if (watchlistMovies.length) {
  emptyMessage.style.display = 'none';
  watchlist.style.display = 'block';
  renderMovies(JSON.parse(localStorage.getItem('moviesArray')));
} else {
  emptyMessage.style.display = 'block';
  watchlist.style.display = 'none';
}
