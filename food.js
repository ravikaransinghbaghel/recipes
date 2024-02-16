let recipeContainer = document.querySelector(".recipe-container");
let submitbtn = document.querySelector("#submitbtn");
let searchbox = document.querySelector("#searchbost");
let cards = document.querySelector(".cards");
let info = document.querySelector(".info");
let close = document.querySelector("#close");
let para = document.querySelector("#para");


async function fetchRecipe(query) {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    response.meals.forEach(meal => {
        let recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
            <div class="img-container">
                <img src="${meal.strMealThumb}" alt="">
                <h2>${meal.strMeal}</h2>
                <p>${meal.strTags}</p>
            </div>
            <button class="makeRecipe">Make-Recipe</button>
        `;
        
        // Event listener for the "Make-Recipe" button
        recipeDiv.querySelector(".makeRecipe").addEventListener("click", () => {
            para.innerHTML = ` <h2> Make ${meal.strMeal}:-</h2>
            ${meal.strInstructions}`;

            info.style.display = "block";
        });
        
        cards.appendChild(recipeDiv);
    });
}

submitbtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let searchInfo = searchbox.value.trim();
    await fetchRecipe(searchInfo);
    if (fetchRecipe(searchInfo)==undefined) {
        recipeContainer.innerHTML = "This is no recipe ,please chack algin.";
    }
    else{
        recipeContainer.innerHTML = "";
    }
});

close.addEventListener("click", () => {
    info.style.display = "none";
});
