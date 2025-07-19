// Main entry point for JavaScript

import Components from './components.js';
import Cart from './cart.js';
import Shop from './shop.js';
import Products from './products.js';

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Load components first
    Components.init();
    
    // Initialize cart functionality
    Cart.init();
    
    // Initialize shop page if we're on that page
    await Shop.init();
    
    // Handle "Add to Cart" buttons on the home page
    if (document.querySelector('.featured-paintings')) {
        const products = await Products.getAllProducts();
        const featuredProducts = products.slice(0, 3); // Get first 3 products for featured section
        
        // Update featured products section with real data
        const productCards = document.querySelectorAll('.featured-paintings .product-card');
        
        if (productCards.length > 0 && featuredProducts.length > 0) {
            productCards.forEach((card, index) => {
                if (index < featuredProducts.length) {
                    const product = featuredProducts[index];
                    
                    // Update product card content
                    const img = card.querySelector('img');
                    const title = card.querySelector('h3');
                    const desc = card.querySelector('p:not(.price)');
                    const price = card.querySelector('.price');
                    const button = card.querySelector('.add-to-cart');
                    
                    if (img) img.src = product.image;
                    if (title) title.textContent = product.name;
                    if (desc) desc.textContent = product.description;
                    if (price) price.textContent = `$${product.price.toFixed(2)}`;
                    if (button) button.setAttribute('data-id', product.id);
                }
            });
            
            // Add event listeners to "Add to Cart" buttons
            document.querySelectorAll('.featured-paintings .add-to-cart').forEach(button => {
                button.addEventListener('click', () => {
                    Cart.addToCart(parseInt(button.getAttribute('data-id')));
                });
            });
        }
    }
});