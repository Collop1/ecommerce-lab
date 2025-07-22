// components.js - Handles reusable UI components like header and footer

// Function to load the header
function loadHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const headerHTML = `
    <section class="navbar-left">
        <div class="logo-container">
            <img src="assets/creative-paints-logo.png" alt="Creative Paints Logo">
            <span>Creative Paints</span>
        </div>
        <nav class="nav-links">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="paintings.html">Paintings</a></li>
                <li><a href="dashboard.html">Dashboard</a></li>
            </ul>
        </nav>
    </section>
    <section class="navbar-right">
        <nav class="auth-links">
            <ul>
                <li><a href="signup.html" class="btn">Sign Up</a></li>
                <li><a href="login.html" class="btn btn-primary">Log In</a></li>
            </ul>
        </nav>
        <div class="cart-icon">
            <a href="#" id="cart-dropdown-toggle">
                <i class="fas fa-shopping-cart"></i>
                <span id="cart-count" class="cart-count">0</span>
            </a>
            <div class="cart-dropdown" id="cart-dropdown">
                <!-- Cart items will be dynamically added here -->
                <div class="cart-footer">
                    <div class="cart-total">Total: $0.00</div>
                    <button class="btn btn-primary">Checkout</button>
                </div>
            </div>
        </div>
    </section>
    `;
    
    header.innerHTML = headerHTML;
}

// Function to load the footer
function loadFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    const footerHTML = `
    <div class="footer-content">
        <div class="footer-links">
            <a href="terms.html">Terms and Conditions</a>
            <a href="privacy.html">Privacy Policy</a>
            <a href="contact.html">Contact Us</a>
        </div>
        <div class="social-links">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
    </div>
    `;
    
    footer.innerHTML = footerHTML;
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
});