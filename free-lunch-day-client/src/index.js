const URL = 'https://free-lunch-day-api-gateway-ms.onrender.com/api/gateway';
const KITCHEN = '/kitchen';
const FOOD_WAREHOUSE = '/food-warehouse';
const FIVE_SECOND_TIMEOUT = 5000;

async function request(url, options) {
    try {
        const data = await fetch(url, options);
        return await data.json();
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const capitalizeFirstLetter = inputString =>
    inputString
        ? inputString.replace(/^\w/, firstLetter => firstLetter.toUpperCase())
        : '';

const formatDate = date => new Date(date).toLocaleString();

(async function getOrders() {
    const orders = await request(`${URL}${KITCHEN}/orders`);

    const tableBody = document.getElementById('orders-body');

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${capitalizeFirstLetter(order.name)}</td>
            <td>${capitalizeFirstLetter(order.status)}</td>
            <td>${formatDate(order.createdAt)}</td>
        `;
        tableBody.appendChild(row);
    });
})();

(async function getRecipes() {
    const recipes = await request(`${URL}${KITCHEN}/recipes`);

    const tableBodyRecipes = document.getElementById('recipes-body');

    recipes.forEach(recipe => {
        const row = document.createElement('tr');
        let ingredientsHtml = '';
        recipe.ingredients.forEach(ingredient => {
            ingredientsHtml += `<li>${capitalizeFirstLetter(ingredient.name)} - ${ingredient.quantity}</li>`;
        });
        row.innerHTML = `
                <td>${capitalizeFirstLetter(recipe.name)}</td>
                <td><ul>${ingredientsHtml}</ul></td>
            `;
        tableBodyRecipes.appendChild(row);
    });
})();

(async function getOrderHistory() {
    const response = await request(`${URL}${KITCHEN}/history`);

    const tableBody = document.getElementById('orders-history-body');

    response.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${capitalizeFirstLetter(order.name)}</td>
                <td>${capitalizeFirstLetter(order.status)}</td>
                <td>${formatDate(order.createdAt)}</td>
            `;
        tableBody.appendChild(row);
    });
})();

(async function getIngredients() {
    const response = await request(`${URL}${FOOD_WAREHOUSE}/ingredients`);

    const tableBody = document.getElementById('ingredients-body');

    response.forEach(ingredient => {
        const row = document.createElement('tr');
        const name = capitalizeFirstLetter(ingredient.name);
        const availableQuantity = ingredient.availableQuantity.toString();
        const capitalizedQuantity = capitalizeFirstLetter(availableQuantity);
        row.innerHTML = `
            <td>${name}</td>
            <td>${capitalizedQuantity}</td>
        `;
        tableBody.appendChild(row);
    });
})();

(async function buyHistory() {
    const response = await request(`${URL}${FOOD_WAREHOUSE}/history`);

    const tableBody = document.getElementById('buy-history-body');

    response.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${capitalizeFirstLetter(order.name)}</td>
                <td>${capitalizeFirstLetter(order.quantity.toString())}</td>
                <td>${formatDate(order.createdAt)}</td>
            `;
        tableBody.appendChild(row);
    });
})();


async function createOrder() {
    const response = await request(`${URL}${KITCHEN}`, {method: 'POST'});
    return response.message;
}

async function createOrderAndDisplayPopup() {
    try {
        const responseMessage = await createOrder();
        const popup = document.getElementById('popup-message');
        popup.textContent = responseMessage;
        popup.classList.add('show');
        setTimeout(() => {
            popup.classList.remove('show');
        }, FIVE_SECOND_TIMEOUT);
    } catch (error) {
        console.error('Error creating order:', error);
    }
}

document.getElementById('popup-button')
    .addEventListener('click', () => {
        createOrderAndDisplayPopup();
    });
