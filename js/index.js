let currentPlants = [];

const allPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())

    .then((json) => displayAllPlants(json.plants));
};

const cartItems = [];
const addToCart = (plantId) => {
  const plant = currentPlants.find((p) => p.id === plantId);
  if (plant) {
    cartItems.push(plant);
    displayCart(cartItems);
  }
};

const removeFromCart = (plantId) => {
  const index = cartItems.findIndex((item) => item.id === plantId);
  if (index > -1) {
    cartItems.splice(index, 1);
    displayCart(cartItems);
    updateCartTotal();
  }
};

const updateCartTotal = () => {
  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  const cartTotalElement = document.getElementById("cart-total");
  if (cartTotalElement) {
    cartTotalElement.textContent = total.toFixed(2);
  }
};

const displayCart = (cartItems) => {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  for (const item of cartItems) {
    const cartItem = document.createElement("div");
    cartItem.className =
      "bg-green-50 rounded-xl p-3 mb-3 border border-green-100 hover:shadow-md transition-all duration-200";

    cartItem.innerHTML = `
      <div class="flex items-center gap-3">
        <!-- Plant Details -->
        <div class="flex-grow min-w-0">
          <h4 class="font-semibold text-gray-800 text-sm truncate">${item.name}</h4>
          <p class="text-xs text-green-600 font-medium">${item.category}</p>
          <p class="text-sm font-bold text-green-700">$${item.price}</p>
        </div>
        
        <!-- Remove Button -->
        <div class="flex-shrink-0">
          <button onclick="removeFromCart(${item.id})" 
                  class="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md transform hover:scale-105">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    cartList.appendChild(cartItem);
  }

  updateCartTotal();
};
const managespinner = (status) => {
  if (status == true) {
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("all-plants").classList.add("hidden");
  } else {
    document.getElementById("all-plants").classList.remove("hidden");
    document.getElementById("loading").classList.add("hidden");
  }
};

const displayAllPlants = (plants) => {
  currentPlants = plants;
  allPlantsContainer = document.getElementById("all-plants");
  allPlantsContainer.innerHTML = "";
  for (plant of plants) {
    const plantDIv = document.createElement("div");

    plantDIv.innerHTML = `
        <div class="lg:max-w-[280px] max-w-[359px] overflow-hidden bg-white p-2 space-y-3 rounded-2xl">
        <div class="bg-gray-500 rounded-2xl w-full h-[180px] overflow-hidden mx-auto"><img src="${plant.image}" alt="" class= "w-full h-full object-cover"></div>
        <h1 onclick="showModal(${plant.id})" class="text-2xl font-bold">${plant.name}</h1>
        <p class= "line-clamp-3">${plant.description}</p>
           <div class="flex justify-between items-center">
             <div class="bg-green-200 text-green-600 rounded-4xl py-1 px-3 font-semibold">
               <h1 class="text-xl" >${plant.category}</h1>
             </div>
             <h1 class="text-xl">$ <span>${plant.price}</span></h1>
           </div>
           <button onclick="addToCart(${plant.id})"  class="py-1 px-3 bg-green-700 text-white text-2xl font-bold text-center w-full rounded-4xl">Add to Cart</button>
      </div>
      `;
    allPlantsContainer.append(plantDIv);
  }
};

const showModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayShowModal(json.plants));
};
const displayShowModal = (plant) => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
        <div> <h1 class="font-bold text-xl">${plant.name}</h1> <div class="w-full h-[180px] mx-auto bg-gray-50"><img src="${plant.image}" alt="" class= "w-full h-full object-cover"> </div> <p><span class=" font-bold">category</span> : <span>${plant.category}</span></p> <p><span class=" font-bold">price</span> $ <span>${plant.price}</span></p> <p><span class=" font-bold">Description</span> : <span>${plant.description}</span></p> </div>`;
  document.getElementById("myModal").showModal();
};

const removeActive = () => {
  const plantsBtn = document.querySelectorAll(".plants-btn");
  plantsBtn.forEach((btn) => btn.classList.remove("active"));
};

const loadCategoryPlant = (id) => {
  managespinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const treeBtn = document.getElementById(`category-btn-${id}`);
      treeBtn.classList.add("active");
      displayCategoriesPlant(json.plants);
    });
};

const displayCategoriesPlant = (plants) => {
  currentPlants = plants; // Update currentPlants for category view
  const allCategoriesContainer = document.getElementById("all-plants");
  allCategoriesContainer.innerHTML = "";
  for (plant of plants) {
    const categorisDIv = document.createElement("div");
    categorisDIv.innerHTML = `
        <div class="lg:max-w-[280px]  max-w-[359px] overflow-hidden bg-white p-2 space-y-3 rounded-2xl">
        <div class="bg-gray-500 rounded-2xl w-full h-[180px] overflow-hidden mx-auto"><img src="${plant.image}" alt="" class= "w-full h-full object-cover"></div>
        <h1 onclick="showModal(${plant.id})" class="text-2xl font-bold cursor-pointer hover:text-green-600 transition-colors">${plant.name}</h1>
        <p class= "line-clamp-3">${plant.description}</p>
           <div class="flex justify-between items-center">
             <div class="bg-green-200 text-green-600 rounded-4xl py-1 px-3 font-semibold">
               <h1 class="text-xl" >${plant.category}</h1>
             </div>
             <h1 class="text-xl">$ <span>${plant.price}</span></h1>
           </div>
           <button onclick="addToCart(${plant.id})" class="py-1 px-3 bg-green-700 hover:bg-green-800 text-white text-2xl font-bold text-center w-full rounded-4xl transition-colors">Add to Cart</button>
      </div>
        `;

    allCategoriesContainer.append(categorisDIv);
  }
  managespinner(false);
};

allPlants();

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories));
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categorise-box");
  categoriesContainer.innerHTML = "";
  for (const cat of categories) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `<button id="category-btn-${cat.id}" onclick="loadCategoryPlant('${cat.id}')" class=" text-green-900 p-2 rounded mb-2 plants-btn">${cat.category_name}</button>`;
    categoriesContainer.append(btnDiv);
  }
};

loadCategories();
