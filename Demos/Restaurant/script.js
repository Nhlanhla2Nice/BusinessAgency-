/* =======================
   1. MENU DATABASE
   ======================= */
const menuItems = [
    // Updated Image for the Steak
    { id: 1, name: "Signature Ribeye", price: 450, img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Seared Salmon", price: 290, img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600" },
    { id: 3, name: "Wild Mushroom Risotto", price: 210, img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=600" },
    { id: 4, name: "Velvet Chocolate Torte", price: 120, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600" }
];

let cart = [];

/* =======================
   2. INITIALIZATION
   ======================= */
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});

function renderMenu() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = menuItems.map(item => `
        <div class="product-card">
            <img src="${item.img}" class="product-img" alt="${item.name}" loading="lazy">
            <div class="product-info">
                <h3>${item.name}</h3>
                <p class="price">R ${item.price.toFixed(2)}</p>
                <button onclick="addToCart(${item.id})" class="btn-shop">Add to Order</button>
            </div>
        </div>
    `).join('');
}

/* =======================
   3. CART LOGIC
   ======================= */
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function addToCart(id) {
    const item = menuItems.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
    showToast(`Added ${item.name} to order`);
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total');
    
    document.getElementById('cart-count').innerText = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-msg">Your plate is empty.</p>';
        totalDisplay.innerText = 'R 0.00';
        return;
    }

    cartItems.innerHTML = cart.map((item) => `
        <div class="cart-item">
            <span>${item.name}</span>
            <strong>R ${item.price.toFixed(2)}</strong>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalDisplay.innerText = `R ${total.toFixed(2)}`;
}

/* =======================
   4. CHECKOUT LOGIC
   ======================= */
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast("Add items to your order first!");
        return;
    }
    
    // Close sidebar
    document.getElementById('cart-sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    
    // Set total in modal
    const total = document.getElementById('cart-total').innerText;
    document.getElementById('checkout-total-display').innerText = total;
    
    // Open modal
    document.getElementById('checkout-modal').classList.add('active');
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal').classList.remove('active');
    
    setTimeout(() => {
        document.getElementById('checkout-step-1').style.display = 'block';
        document.getElementById('payment-loading').style.display = 'none';
        document.getElementById('payment-success').style.display = 'none';
        document.getElementById('payment-form').reset();
    }, 300);
}

function processPayment(e) {
    e.preventDefault();
    document.getElementById('checkout-step-1').style.display = 'none';
    document.getElementById('payment-loading').style.display = 'flex';

    setTimeout(() => {
        document.getElementById('payment-loading').style.display = 'none';
        document.getElementById('payment-success').style.display = 'flex';
        cart = [];
        updateCartUI();
    }, 2000);
}

/* =======================
   5. UTILS & THEME
   ======================= */
function showToast(message = "Added to your order") {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const isLight = html.getAttribute('data-theme') === 'light';
    
    html.setAttribute('data-theme', isLight ? 'dark' : 'light');
    themeBtn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});