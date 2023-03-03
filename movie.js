const movieId = window.location.href.split("=")[1];
const apiKey = "8810224372b460888a4da53b3953f38b";

const movieTitle = document.getElementById("movie-title");
const movieImage = document.getElementById("movie-image");
const movieDescription = document.getElementById("movie-description");
const watchNowButton = document.getElementById("watch-now-button");
const modalContainer = document.getElementById("modal-container");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalCloseButton = document.getElementById("modal-close");

// Fetch the movie details

fetch(
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
)
  .then((response) => response.json())
  .then((data) => {
    movieTitle.textContent = data.title;
    movieDescription.textContent = data.overview;
    movieImage.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  })
  .catch((error) => console.error(error));



watchNowButton.addEventListener("click", () => {
  modalContainer.classList.remove("hidden");
  modalBackdrop.classList.remove("hidden");
});

modalCloseButton.addEventListener("click", () => {
  modalContainer.classList.add("hidden");
  modalBackdrop.classList.add("hidden");
});
