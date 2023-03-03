const apiKey = "8810224372b460888a4da53b3953f38b";
const categoryId = window.location.href.split("cid=")[1].split("&")[0];
categoryName = window.location.href.split("category=")[1]
const catergoryMovieContainer = document.getElementById(
  "category-movie-container"
);
const categoryTitleContainer = document.getElementById("category-title");
categoryTitleContainer.textContent = `${categoryName} Movies`

// Define the URL for the API request
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${categoryId}`;

// Fetch the data from the API
async function fetchCategoryMovies() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const movies = data.results.map((movie) => ({
    id: movie.id,
    name: movie.title,
    description: movie.overview.slice(0, 200),
    image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  }));
  return movies;
}

// Create the category movie card
function createCategoryMovieCard(categoryMovie) {
  const categoryMovieCardContainer = document.createElement("div");
  categoryMovieCardContainer.className =
    "w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8";

  const categoryMovieCardBg = document.createElement("div");
  categoryMovieCardBg.className = "bg-white rounded-lg p-4";

  categoryMovieCardImgContainer = document.createElement("div");
  categoryMovieCardImgContainer.className = "w-full mb-4";

  const categoryMovieCardImg = document.createElement("img");
  categoryMovieCardImg.src = categoryMovie.image;
  categoryMovieCardImg.alt = categoryMovie.name;
  categoryMovieCardImg.className = "w-full rounded-lg";
  categoryMovieCardImgContainer.appendChild(categoryMovieCardImg);

  const categoryMovieCardTitle = document.createElement("h3");
  categoryMovieCardTitle.className = "text-xl font-bold mb-2";
  categoryMovieCardTitle.textContent = categoryMovie.name;

  const categoryMovieCardDesc = document.createElement("p");
  categoryMovieCardDesc.className = "text-gray-800 text-base mb-4";
  categoryMovieCardDesc.textContent = categoryMovie.description;

  const categoryMovieCardButton = document.createElement("button");
  categoryMovieCardButton.className =
    "bg-red-600 px-6 py-2 rounded-full font-bold hover:bg-red-700";
  categoryMovieCardButton.textContent = "Watch Now";
  categoryMovieCardButton.addEventListener("click", () => {
    window.location.href = `/movie.html?mid=${categoryMovie.id}`;
  });

  categoryMovieCardBg.appendChild(categoryMovieCardImgContainer);
  categoryMovieCardBg.appendChild(categoryMovieCardTitle);
  categoryMovieCardBg.appendChild(categoryMovieCardDesc);
  categoryMovieCardBg.appendChild(categoryMovieCardButton);

  categoryMovieCardContainer.appendChild(categoryMovieCardBg);

  return categoryMovieCardContainer;
}

// Displays Categories
async function displayCategoryMovies() {
  const movieCatergories = await fetchCategoryMovies();

  movieCatergories.forEach((movieCategory) => {
    const movieCategoryCard = createCategoryMovieCard(movieCategory);
    catergoryMovieContainer.appendChild(movieCategoryCard);
  });
}

displayCategoryMovies();