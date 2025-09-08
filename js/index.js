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
        plantDIv.innerHTML = `
        <div class="max-w-[280px] overflow-hidden bg-white p-2 space-y-3 rounded-2xl">
        <div class="bg-gray-500 rounded-2xl w-full h-[180px] overflow-hidden mx-auto"><img src="${plant.image}" alt="" class= "w-full h-full object-cover"></div>
        <h1 class="text-2xl font-bold">${plant.name}</h1>
        <p class= "line-clamp-3">${plant.description}</p>
           <div class="flex justify-between items-center">
             <div class="bg-green-200 text-green-600 rounded-4xl py-1 px-3 font-semibold">
               <h1 class="text-xl" >${plant.category}</h1>
             </div>
             <h1 class="text-xl">$ <span>${plant.price}</span></h1>
           </div>
           <button class="py-1 px-3 bg-green-700 text-white text-2xl font-bold text-center w-full rounded-4xl">Add to Cart</button>
      </div>
      `;
      allPlantsContainer.append(plantDIv);
    }
};
const removeActive = () => {
const plantsBtn =document.querySelectorAll(".plants-btn");
plantsBtn.forEach((btn) => btn.classList.remove("active"));


}



   const loadCategoryPlant = (id) =>  {
    
const url =`https://openapi.programming-hero.com/api/category/${id}`;


fetch(url)
.then((res) => res.json())
.then ((json) => {
  removeActive();
  const treeBtn =document.getElementById(`category-btn-${id}`);
  treeBtn.classList.add("active");
  displayCategoriesPlant(json.plants);
});
};

const displayCategoriesPlant = (plants) => {
    const allCategoriesContainer =document.getElementById("all-plants");
    allCategoriesContainer.innerHTML = "";
    for(plant of plants) {
        const categorisDIv =document.createElement("div");
        categorisDIv.innerHTML= `
        <div class="max-w-[280px] overflow-hidden bg-white p-2 space-y-3 rounded-2xl">
        <div class="bg-gray-500 rounded-2xl w-full h-[180px] overflow-hidden mx-auto"><img src="${plant.image}" alt="" class= "w-full h-full object-cover"></div>
        <h1 class="text-2xl font-bold">${plant.name}</h1>
        <p class= "line-clamp-3">${plant.description}</p>
           <div class="flex justify-between items-center">
             <div class="bg-green-200 text-green-600 rounded-4xl py-1 px-3 font-semibold">
               <h1 class="text-xl" >${plant.category}</h1>
             </div>
             <h1 class="text-xl">$ <span>${plant.price}</span></h1>
           </div>
           <button class="py-1 px-3 bg-green-700 text-white text-2xl font-bold text-center w-full rounded-4xl">Add to Cart</button>
      </div>
        `;
        
        allCategoriesContainer.append(categorisDIv);
    }

        
    
} ; 


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
        btnDiv.innerHTML = `<button id="category-btn-${cat.id}" onclick = "loadCategoryPlant('${cat.id}')" class=" text-green-900 p-2 rounded mb-2 plants-btn">${cat.category_name}</button>`;
        categoriesContainer.append(btnDiv);
    }
};

loadCategories();
