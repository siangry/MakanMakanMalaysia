let recipes = [];

function fetchRecipes() {
    $.ajax({
        url: 'http://localhost:3000/api/recipes', 
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            recipes = data; 
            displayRecipes(); 
        },
        error: function(xhr, status, error) {
            console.error("Error fetching recipes:", error);
            $('#recipeContainer').html('<p>Error loading recipes. Please try again later.</p>');
        }
    });
}

function displayRecipes(category = 'all') {
    const container = document.getElementById('recipeContainer');
    container.innerHTML = ''; 
    
    if (recipes.length === 0) {
        container.innerHTML = '<p>Loading recipes...</p>';
        return;
    }
    
    recipes.forEach(recipe => {
        if (category === 'all' || recipe.category === category) {
            const card = createRecipeCard(recipe);
            container.appendChild(card);
        }
    });
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
        <div class="recipe-info">
            <div class="recipe-category">${recipe.category}</div>
            <div class="recipe-title">${recipe.title}</div>
            <div class="recipe-author">By ${recipe.author}</div>
        </div>
    `;
    card.addEventListener('click', () => showRecipeDetail(recipe));
    return card;
}

function showRecipeDetail(recipe) {
    const detailContainer = document.getElementById('recipeDetailContainer');
    detailContainer.innerHTML = `
        <div class="recipe-detail">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-info">
                <h2 class="recipe-title">${recipe.title}</h2>
                <div class="recipe-category">${recipe.category}</div>
                <div class="recipe-author">By ${recipe.author}</div>
            </div>
            <div class="Ingredients">
                <h3>Ingredients:</h3>
                <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
            </div>
            <div class="Instructions">
                <h3>Instructions:</h3>
                <ol>${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}</ol>
            </div>
            <div class="youtube-video">
                <h3>Video Tutorial:</h3>
                <iframe width="560" height="315" src="${recipe.youtubeId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `;
    document.getElementById('recipeContainer').style.display = 'none';
    detailContainer.style.display = 'block';
}

// go back to the recipe main page
function backToRecipeList() {
    document.getElementById('recipeDetailContainer').style.display = 'none';
    document.getElementById('recipeContainer').style.display = 'flex';
}

// back button
document.body.insertAdjacentHTML('afterbegin', '<button onclick="backToRecipeList()" id="backButton" style="display:none;">Back</button>');

function showRecipeDetail(recipe) {
    const detailContainer = document.getElementById('recipeDetailContainer');
    detailContainer.innerHTML = `
        <div class="recipe-detail">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-info">
                <h2 class="recipe-title">${recipe.title}</h2>
                <div class="recipe-category">${recipe.category}</div>
                <div class="recipe-author">By ${recipe.author}</div>
            </div>
            <div class="Ingredients">
                <h3>Ingredients:</h3>
                <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
            </div>
            <div class="Instructions">
                <h3>Instructions:</h3>
                <ol>${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}</ol>
            </div>
            <div class="youtube-video">
                <h3>Video Tutorial:</h3>
                <iframe width="560" height="315" src="${recipe.youtubeId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `;
    document.getElementById('recipeContainer').style.display = 'none';
    detailContainer.style.display = 'block';
    document.getElementById('backButton').style.display = 'block';
}

function backToRecipeList() {
    document.getElementById('recipeDetailContainer').style.display = 'none';
    document.getElementById('recipeContainer').style.display = 'flex';
    document.getElementById('backButton').style.display = 'none';
}


function displayRecipes(category = 'all') {
    const container = document.getElementById('recipeContainer');
    container.innerHTML = '';
    recipes.forEach(recipe => {
        if (category === 'all' || recipe.category === category) {
            const card = createRecipeCard(recipe);
            container.appendChild(card);
        }
    });
}

function setupFilterButtons() {
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            displayRecipes(category);
        });
    });
}

$(document).ready(function() {
    fetchRecipes(); 
    setupFilterButtons();
});


// Go To Top button
let mybutton = document.getElementById("myBtn");
            
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
