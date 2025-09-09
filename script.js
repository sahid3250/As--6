const categoryList = document.getElementById("category-list");
const plantContainer = document.getElementById("plant-container");
const cartList = document.getElementById("cart-list");
const totalElement = document.getElementById("total");
const spinner = document.getElementById("spinner");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.getElementById("close-modal");

let total = 0;

// Spinner Helper
function showSpinner() { spinner.classList.remove("hidden"); }
function hideSpinner() { spinner.classList.add("hidden"); }

// Load Categories
async function loadCategories() {
  showSpinner();
  const res = await fetch("https://openapi.programming-hero.com/api/categories");
  const data = await res.json();
  hideSpinner();

  data.categories.forEach(cat => {
    const li = document.createElement("li");
    li.textContent = cat.category_name;
    li.classList.add("category-btn");
    li.onclick = () => {
      document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
      li.classList.add("active");
      // console.log
      loadPlantsByCategory(cat.id);
    };
    categoryList.appendChild(li);
  });
}

// Load All Plants
async function loadPlants() {
  showSpinner();
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  hideSpinner();
  displayPlants(data.plants);
}

// Load Plants by Category
async function loadPlantsByCategory(id) {
  showSpinner();
  const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
  const data = await res.json();
  hideSpinner();
  displayPlants(data.plants);
}

// Display Plants
function displayPlants(plants) {
  console.log(plants)
  plantContainer.innerHTML = "";
  plants.forEach(plant => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}" width="100%">
      <h3 class="plant-name" data-id="${plant.id}">${plant.name}</h3>
      <p>${plant.description || "No description available."}</p>
      <p>Category: ${plant.category}</p>
      <p>Price: $${plant.price}</p>
      <button onclick="addToCart('${plant.plant_name}', ${plant.price}, this)">Add to Cart</button>
    `;
    plantContainer.appendChild(div);

    // Modal trigger
    div.querySelector(".plant-name").onclick = () => loadPlantDetails(plant.plant_id);
  });
}

// Load Plant Details in Modal
async function loadPlantDetails(id) {
  const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
  const data = await res.json();
  const plant = data.plant;

  modalBody.innerHTML = `
    <h2>${plant.plant_name}</h2>
    <img src="${plant.image}" alt="${plant.plant_name}" width="100%">
    <p>${plant.description}</p>
    <p><strong>Price:</strong> $${plant.price}</p>
  `;
  modal.classList.remove("hidden");
}
closeModal.onclick = () => modal.classList.add("hidden");

// Add to Cart
function addToCart(name, price, btn) {
  const li = document.createElement("li");
  li.innerHTML = `${name} - $${price} <button onclick="removeFromCart(this, ${price})">❌</button>`;
  cartList.appendChild(li);
  total += price;
  updateTotal();
}



  const categoriesList = document.getElementById("categories");
    const plantsContainer = document.getElementById("plants");

    // // Load all categories
    // fetch("https://openapi.programming-hero.com/api/categories")
    //   .then(res => res.json())
    //   .then(data => {
    //     data.categories.forEach(cat => {
    //       const li = document.createElement("li");
    //       li.innerText = cat.category;
    //       li.addEventListener("click", () => loadCategoryPlants(cat.category_id));
    //       categoriesList.appendChild(li);
    //     });
    //   });



// Remove from Cart
function removeFromCart(btn, price) {
  btn.parentElement.remove();
  total -= price;
  updateTotal();
}

// Update Total
function updateTotal() {
  totalElement.textContent = `Total: $${total}`;
}


// Initial Load
loadCategories();
loadPlants();
