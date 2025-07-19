// Handles all cart-related functionality

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart UI elements
function initCart() {
    setupCartToggle();
    updateCartDisplay();
    updateCartCount();
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
        updateCartCount();
        showAddedToCartMessage();
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
                updateCartCount();
                showAddedToCartMessage();
            }
        });
    }
}

// Remove a product from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// Update quantity of a product in the cart
function updateCartItemQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateCartDisplay();
            updateCartCount();
        }
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update the cart count indicator
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Show "Added to Cart" message
function showAddedToCartMessage() {
    // Create message element if it doesn't exist
    let messageElement = document.getElementById('cart-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'cart-message';
        messageElement.className = 'cart-message';
        document.body.appendChild(messageElement);
    }
    
    // Update message
    messageElement.textContent = 'Added to cart!';
    messageElement.classList.add('show');
    
    // Hide message after 2 seconds
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 2000);
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
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">×</button>
        `;
        
        cartDropdown.insertBefore(cartItem, cartFooter);
    });
    
    // Update total
    document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
    
    // Add event listeners to buttons
    cartDropdown.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            removeFromCart(parseInt(this.getAttribute('data-id')));
        });
    });
    
    cartDropdown.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            if (item) {
                updateCartItemQuantity(id, item.quantity - 1);
            }
        });
    });
    
    cartDropdown.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            if (item) {
                updateCartItemQuantity(id, item.quantity + 1);
            }
        });
    });
    
    // Update checkout button
    const checkoutButton = cartFooter.querySelector('button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            window.location.href = 'checkout.html';
        });
    }
}