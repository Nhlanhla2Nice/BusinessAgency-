// 1. Menu Data
const menuItems = [
    { id: 1, name: "Truffle Ribeye", price: 450, img: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=600" },
    { id: 2, name: "Seared Salmon", price: 290, img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600" },
    { id: 3, name: "Wild Mushroom Risotto", price: 210, img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=600" },
    { id: 4, name: "Velvet Chocolate Torte", price: 120, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600" }
];

let cart = [];

// 2. Render Menu
const productGrid = document.getElementById('product-grid');
menuItems.forEach(item => {
    productGrid.innerHTML += `
        <div class="product-card">
            <img src="${item.img}" class="product-img" alt="${item.name}">
            <div class="product-info">
                <h3>${item.name}</h3>
                <p class="price">R ${item.price.toFixed(2)}</p>
                <button onclick="addToCart(${item.id})" class="btn-shop" style="margin-top:15px; width:100%">Add to Order</button>
            </div>
        </div>
    `;
});

// 3. Cart Functions
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function addToCart(id) {
    const item = menuItems.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
    showToast();
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total');
    const countDisplay = document.getElementById('cart-count');
    
    document.getElementById('cart-count').innerText = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-msg">Your plate is empty.</p>';
        totalDisplay.innerText = 'R 0.00';
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:15px;">
            <span>${item.name}</span>
            <strong>R ${item.price.toFixed(2)}</strong>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalDisplay.innerText = `R ${total.toFixed(2)}`;
    document.getElementById('checkout-total-display').innerText = `R ${total.toFixed(2)}`;
}

// 4. Checkout Logic
function openCheckoutModal() {
    if(cart.length === 0) return alert("Add items to your order first!");
    document.getElementById('checkout-modal').style.display = 'flex';
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

function processPayment(e) {
    e.preventDefault();
    document.getElementById('checkout-step-1').style.display = 'none';
    document.getElementById('payment-loading').style.display = 'block';

    setTimeout(() => {
        document.getElementById('payment-loading').style.display = 'none';
        document.getElementById('payment-success').style.display = 'block';
        cart = [];
        updateCartUI();
    }, 2000);
}

// 5. Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}