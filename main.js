const apiKey = "8810224372b460888a4da53b3953f38b";
const categoryEndpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
const categoriesContainer = document.querySelector("#categories");

// Fetch categories from TMDb API
async function fetchCategories() {
  try {
    const response = await fetch(categoryEndpoint);
    const data = await response.json();
    const categories = data.genres.map((genre) => ({
      id: genre.id,
      name: genre.name,
      imageUrl: `https://picsum.photos/seed/${genre.name}/400/300`,
    }));
    return categories.slice(0, 4);
  } catch (error) {
    console.log(error);
  }
}

// Create category card
function createCategoryCard(category) {
  const categoryCard = document.createElement("div");
  categoryCard.className = "relative";

  const categoryImage = document.createElement("img");
  categoryImage.classList.add("w-full", "h-auto", "rounded-lg", "shadow-lg");
  categoryImage.src = `https://picsum.photos/seed/${category.id}/400/300`;
  categoryImage.alt = category.name;
  categoryCard.appendChild(categoryImage)

  const categoryCardBg = document.createElement("div");
  categoryCardBg.className = "absolute inset-0 bg-black opacity-50 rounded-lg";
  categoryCard.appendChild(categoryCardBg)

  const categoryCardContent = document.createElement("div");
  categoryCardContent.className =
    "absolute inset-0 flex flex-col items-center justify-center text-white";
  const categoryCardName = document.createElement("h3");
  categoryCardName.className = "text-2xl font-bold mb-4";
  categoryCardName.textContent = category.name;
  const categoryCardBtn = document.createElement("button");
  categoryCardBtn.className =
    "bg-red-600 px-6 py-3 rounded-full font-bold hover:bg-red-700";
  categoryCardBtn.textContent = "Explore";
  categoryCardBtn.addEventListener("click", () => {
    window.location.href = `/category.html?cid=${category.id}`;
  });
  categoryCardContent.appendChild(categoryCardName);
  categoryCardContent.appendChild(categoryCardBtn);

  categoryCard.appendChild(categoryCardContent)

  return categoryCard;
}

// Displays Categories
async function displayCategories() {
  const categories = await fetchCategories();

  categories.forEach((category) => {
    const categoryCard = createCategoryCard(category);
    categoriesContainer.appendChild(categoryCard)
  })
}

displayCategories();