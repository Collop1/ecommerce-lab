// Function to load the header
function loadHeader() {
    const headerHTML = `
    <div class="logo-container">
        <img src="assets/creative-paints-logo.png" alt="Creative Paints Logo">
        <span>Creative Paints</span>
    </div>
    <nav>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="paintings.html">Paintings</a></li>
            <li><a href="dashboard.html">Dashboard</a></li>
            <li><a href="signup.html" class="btn">Sign Up</a></li>
            <li><a href="login.html" class="btn btn-primary">Log In</a></li>
        </ul>
    </nav>
    <div class="cart-icon">
        <a href="#" id="cart-dropdown-toggle"><i class="fas fa-shopping-cart"></i></a>
        <div class="cart-dropdown" id="cart-dropdown">
            <!-- Cart items will be dynamically added here -->
            <div class="cart-footer">
                <div class="cart-total">Total: $0.00</div>
                <button class="btn btn-primary">Checkout</button>
            </div>
        </div>
    </div>
    `;
    
    document.querySelector('header').innerHTML = headerHTML;
}

// Function to load the footer
function loadFooter() {
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
    
    document.querySelector('footer').innerHTML = footerHTML;
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
});