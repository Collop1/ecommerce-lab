// shop.js - Handles shop page specific functionality

import Products from './products.js';
import Cart from './cart.js';

const Shop = {
    products: [],
    categories: [],
    
    // Initialize shop page
    async init() {
        if (!document.querySelector('.shop-container')) return;
        
        // Fetch products and categories from API
        this.products = await Products.getAllProducts();
        this.categories = await Products.getAllCategories();
        
        // Display products and set up controls
        this.displayProducts(this.products);
        this.setupSortingAndFiltering();
        this.setupSearch();
        
        // Add event listeners for "Add to Cart" buttons
        this.setupAddToCartButtons();
    },
    
    // Display products in the grid
    displayProducts(productsToDisplay) {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;
        
        productGrid.innerHTML = '';
        
        if (productsToDisplay.length === 0) {
            productGrid.innerHTML = '<div class="no-products">No products found</div>';
            return;
        }
        
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
        
        this.setupAddToCartButtons();
    },
    
    // Set up "Add to Cart" button event listeners
    setupAddToCartButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                Cart.addToCart(parseInt(button.getAttribute('data-id')));
            });
        });
    },
    
    // Set up sorting and filtering controls
    setupSortingAndFiltering() {
        const sortButton = document.getElementById('sort-button');
        const categoriesButton = document.getElementById('categories-button');
        
        if (sortButton) {
            sortButton.addEventListener('click', () => {
                const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Name: A to Z', 'Name: Z to A'];
                const sortMenu = document.createElement('div');
                sortMenu.className = 'dropdown-menu';
                
                sortOptions.forEach(option => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'dropdown-item';
                    optionElement.textContent = option;
                    optionElement.addEventListener('click', () => {
                        this.sortProducts(option);
                        sortMenu.remove();
                    });
                    sortMenu.appendChild(optionElement);
                });
                
                // Position and show the menu
                document.body.appendChild(sortMenu);
                const buttonRect = sortButton.getBoundingClientRect();
                sortMenu.style.top = (buttonRect.bottom + window.scrollY) + 'px';
                sortMenu.style.left = buttonRect.left + 'px';
                
                // Close menu when clicking outside
                document.addEventListener('click', function closeMenu(e) {
                    if (!sortMenu.contains(e.target) && e.target !== sortButton) {
                        sortMenu.remove();
                        document.removeEventListener('click', closeMenu);
                    }
                });
            });
        }
        
        if (categoriesButton) {
            categoriesButton.addEventListener('click', () => {
                const categoryMenu = document.createElement('div');
                categoryMenu.className = 'dropdown-menu';
                
                // Add "All" option
                const allOption = document.createElement('div');
                allOption.className = 'dropdown-item';
                allOption.textContent = 'All Categories';
                allOption.addEventListener('click', async () => {
                    this.products = await Products.getAllProducts();
                    this.displayProducts(this.products);
                    categoryMenu.remove();
                });
                categoryMenu.appendChild(allOption);
                
                // Add category options
                this.categories.forEach(category => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'dropdown-item';
                    optionElement.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                    optionElement.addEventListener('click', async () => {
                        const filteredProducts = await Products.getProductsByCategory(category);
                        this.displayProducts(filteredProducts);
                        categoryMenu.remove();
                    });
                    categoryMenu.appendChild(optionElement);
                });
                
                // Position and show the menu
                document.body.appendChild(categoryMenu);
                const buttonRect = categoriesButton.getBoundingClientRect();
                categoryMenu.style.top = (buttonRect.bottom + window.scrollY) + 'px';
                categoryMenu.style.left = buttonRect.left + 'px';
                
                // Close menu when clicking outside
                document.addEventListener('click', function closeMenu(e) {
                    if (!categoryMenu.contains(e.target) && e.target !== categoriesButton) {
                        categoryMenu.remove();
                        document.removeEventListener('click', closeMenu);
                    }
                });
            });
        }
    },
    
    // Sort products based on selected option
    sortProducts(sortOption) {
        let sortedProducts = [...this.products];
        
        switch(sortOption) {
            case 'Price: Low to High':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'Price: High to Low':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'Name: A to Z':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Name: Z to A':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
        
        this.displayProducts(sortedProducts);
    },
    
    // Set up search functionality
    setupSearch() {
        const searchInput = document.getElementById('search-input');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase().trim();
                
                if (searchTerm === '') {
                    this.displayProducts(this.products);
                    return;
                }
                
                const filteredProducts = this.products.filter(product => 
                    product.name.toLowerCase().includes(searchTerm) || 
                    product.description.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm)
                );
                
                this.displayProducts(filteredProducts);
            });
        }
    }
};

export default Shop;