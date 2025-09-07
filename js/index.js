const allPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((json) => displayAllPlants(json.plants));
};
const displayAllPlants = (plants) => {
    allPlantsContainer =document.getElementById("all-plants");
    allPlantsContainer.innerHTML = "";
    for(plant of plants) {
        const plantDIv =document.createElement("div");
        plantDIv.innerHTML = `<div class="max-w-[330px]  bg-white p-2 space-y-3 rounded-2xl">
        <div class="bg-gray-500 rounded-2xl w-full h-[180px] overflow-hidden mx-auto"><img src="${plant.image}" alt="" class= "w-full h-full object-cover"></div>
        <h1 class="text-2xl font-bold">${plant.name}</h1>
        <p>${plant.description}</p>
           <div class="flex justify-between items-center">
             <div class="bg-green-200 text-green-600 rounded-4xl py-1 px-3 font-semibold">
               <h1 class="text-xl" >${plant.category}</h1>
             </div>
             <h1 class="text-xl">$ <span>${plant.price}</span></h1>
           </div>
           <button class="py-1 px-3 bg-green-700 text-white text-2xl font-bold text-center w-full rounded-4xl">Add to Cart</button>
      </div>`;
      allPlantsContainer.append(plantDIv);
    }
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
        btnDiv.innerHTML = `<p class="bg-green-200 text-green-900 p-2 rounded mb-2">${cat.category_name}</p>`;
        categoriesContainer.append(btnDiv);
    }
};

loadCategories();
