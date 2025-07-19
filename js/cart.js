// Handles all cart-related functionality

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart UI elements
function initCart() {
    setupCartToggle();
    updateCartDisplay();
}

// Set up cart dropdown toggle
function setupCartToggle() {
    const cartToggle = document.getElementById('cart-dropdown-toggle');
    const cartDropdown = document.getElementById('cart-dropdown');

    if (cartToggle && cartDropdown) {
        cartToggle.addEventListener('click', function(e) {
            e.preventDefault();
            cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
        });

        // Close cart when clicking outside
        document.addEventListener('click', function(e) {
            if (!cartToggle.contains(e.target) && !cartDropdown.contains(e.target)) {
                cartDropdown.style.display = 'none';
            }
        });
    }
}

// Add a product to the cart
function addToCart(productId) {
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
        saveCart();
        updateCartDisplay();
    } else {
        // Fetch product details from API
        fetchProductById(productId, function(product) {
            if (product) {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
                saveCart();
                updateCartDisplay();
            }
        });
    }
}

// Remove a product from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update the cart display in the UI
function updateCartDisplay() {
    const cartDropdown = document.getElementById('cart-dropdown');
    if (!cartDropdown) return;
    
    // Clear current cart items (except the footer)
    const cartFooter = cartDropdown.querySelector('.cart-footer');
    cartDropdown.innerHTML = '';
    cartDropdown.appendChild(cartFooter);
    
    // If cart is empty
    if (cart.length === 0) {
        const emptyCart = document.createElement('div');
        emptyCart.className = 'empty-cart';
        emptyCart.textContent = 'Your cart is empty';
        cartDropdown.insertBefore(emptyCart, cartFooter);
        document.querySelector('.cart-total').textContent = 'Total: $0.00';
        return;
    }
    
    // Add cart items
    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">×</button>
        `;
        
        cartDropdown.insertBefore(cartItem, cartFooter);
    });
    
    // Update total
    document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            removeFromCart(parseInt(this.getAttribute('data-id')));
        });
    });
}