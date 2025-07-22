// Handles fetching products from FakeStoreAPI

// Base URL for the Fake Store API
const productsURL = 'https://fakestoreapi.com/products';

// Fetch all products from the API
function fetchAllProducts(callback) {
    fetch(`${productsURL}`)
        .then(response => response.json())
        .then(data => {
            // Transform the data to match our expected format
            const products = data.map(product => ({
                id: product.id,
                name: product.title,
                description: product.description.substring(0, 100) + '...',
                price: product.price,
                image: product.image,
                category: product.category
            }));
            callback(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            callback([]);
        });
}

// Fetch a single product by ID
function fetchProductById(id, callback) {
    fetch(`${productsURL}/${id}`)
        .then(response => response.json())
        .then(product => {
            callback({
                id: product.id,
                name: product.title,
                description: product.description,
                price: product.price,
                image: product.image,
                category: product.category
            });
        })
        .catch(error => {
            console.error(`Error fetching product with ID ${id}:`, error);
            callback(null);
        });
}

// Fetch all categories
function fetchAllCategories(callback) {
    fetch(`${productsURL}/categories`)
        .then(response => response.json())
        .then(categories => {
            callback(categories);
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
            callback([]);
        });
}

// Fetch products by category
function fetchProductsByCategory(category, callback) {
    fetch(`${productsURL}/category/${category}`)
        .then(response => response.json())
        .then(data => {
            const products = data.map(product => ({
                id: product.id,
                name: product.title,
                description: product.description.substring(0, 100) + '...',
                price: product.price,
                image: product.image,
                category: product.category
            }));
            callback(products);
        })
        .catch(error => {
            console.error(`Error fetching products in category ${category}:`, error);
            callback([]);
        });
}