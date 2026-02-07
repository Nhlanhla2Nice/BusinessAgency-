/* =======================
   1. PRODUCT DATABASE
   ======================= */
const products = [
    { id: 1, name: "The Emerald Lounge", price: 12500, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Accent Chair No. 4", price: 4200, img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Midnight Arc Lamp", price: 1800, img: "https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 4, name: "Oak Coffee Table", price: 3500, img: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Velvet Ottoman", price: 2100, img: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "Nordic Dining Set", price: 18000, img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80" },
    { id: 7, name: "Minimalist Bookshelf", price: 5600, img: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80" },
    { id: 8, name: "Ceramic Vase Set", price: 850, img: "https://images.pexels.com/photos/4207785/pexels-photo-4207785.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 9, name: "Leather Armchair", price: 9200, img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80" },
    { id: 10, name: "Marble Side Table", price: 2900, img: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=600&q=80" },
    { id: 11, name: "Abstract Wall Art", price: 1500, img: "https://images.pexels.com/photos/247676/pexels-photo-247676.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 12, name: "Modern Floor Rug", price: 3800, img: "https://images.pexels.com/photos/6758354/pexels-photo-6758354.jpeg?auto=compress&cs=tinysrgb&w=600" }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderProducts();
});

/* =======================
   2. RENDER LOGIC
   ======================= */
function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(product => `
        <div class="card">
            <div class="img-box"><img src="${product.img}" loading="lazy" alt="${product.name}"></div>
            <div class="details">
                <h3>${product.name}</h3>
                <p class="price">R ${product.price.toLocaleString()}</p>
                <button class="btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

/* =======================
   3. CART LOGIC
   ======================= */
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    showToast(`Added "${product.name}"`);
}

function updateCartUI() {
    document.getElementById('cart-count').textContent = cart.length;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').textContent = `R ${total.toLocaleString()}`;
    
    const cartItems = document.getElementById('cart-items');
    if(cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-msg" style="text-align:center; color:gray; margin-top:20px;">Cart is empty.</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="item-info"><h4>${item.name}</h4><p>R ${item.price.toLocaleString()}</p></div>
            </div>
        `).join('');
    }
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

/* =======================
   4. CHECKOUT LOGIC (FIXED)
   ======================= */
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast("Your cart is empty!");
        return;
    }
    // Close sidebar first
    document.getElementById('cart-sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    
    // Update total inside modal
    const total = document.getElementById('cart-total').textContent;
    document.getElementById('checkout-total-display').textContent = total;
    
    // Open modal
    document.getElementById('checkout-modal').classList.add('active');
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal').classList.remove('active');
    // Reset form view after small delay
    setTimeout(() => {
        document.getElementById('checkout-step-1').style.display = 'block';
        document.getElementById('payment-loading').style.display = 'none';
        document.getElementById('payment-success').style.display = 'none';
        document.getElementById('payment-form').reset();
    }, 300);
}

function processPayment(event) {
    event.preventDefault();
    
    // Hide Form, Show Spinner
    document.getElementById('checkout-step-1').style.display = 'none';
    document.getElementById('payment-loading').style.display = 'flex';
    
    // Simulate 2 second server delay
    setTimeout(() => {
        document.getElementById('payment-loading').style.display = 'none';
        document.getElementById('payment-success').style.display = 'flex';
        
        // Clear Cart
        cart = [];
        updateCartUI();
        showToast("Payment Successful!");
    }, 2000);
}

/* =======================
   5. UTILS
   ======================= */
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.className = "toast show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

function initTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    const icon = btn.querySelector('i');
    
    // Auto detect dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    btn.addEventListener('click', () => {
        const curr = html.getAttribute('data-theme');
        const next = curr === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        icon.classList.replace(curr === 'light' ? 'fa-moon' : 'fa-sun', next === 'light' ? 'fa-moon' : 'fa-sun');
    });
}