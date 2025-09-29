// Product Data
const products = [
    {
        id: 1,
        name: "Mystic Rose",
        description: "Floral scent with rose & jasmine notes",
        price: 59,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
    },
    {
        id: 2,
        name: "Ocean Breeze",
        description: "Fresh aqua perfume with citrus",
        price: 49,
        image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
    },
    {
        id: 3,
        name: "Amber Night",
        description: "Warm amber & vanilla",
        price: 65,
        image: "/amber night...png"
    },
    {
        id: 4,
        name: "Citrus Bloom",
        description: "Sweet citrus with fruity top notes",
        price: 39,
        image: "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
    },
    {
        id: 5,
        name: "Royal Oud",
        description: "Luxury oud & sandalwood",
        price: 79,
        image: "/Royal Oud.jpg"
    },
    {
        id: 6,
        name: "Velvet Musk",
        description: "Soft musk with powdery finish",
        price: 55,
        image: "/-velvet-musk-1.jpeg"
    }
];

// DOM Elements
const productContainer = document.getElementById('product-container');
const cartIcon = document.querySelector('.cart-icon');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartCount = document.querySelector('.cart-count');
const checkoutBtn = document.querySelector('.checkout-btn');
const checkoutOverlay = document.querySelector('.checkout-overlay');
const closeCheckoutBtn = document.querySelector('.close-checkout');
const orderForm = document.getElementById('order-form');
const orderItemsContainer = document.querySelector('.order-items');
const checkoutTotal = document.querySelector('.checkout-total');
const orderConfirmation = document.querySelector('.order-confirmation');
const continueShoppingBtn = document.querySelector('.continue-shopping');

// Cart
let cart = [];

// Display Products
function displayProducts() {
    let result = '';
    products.forEach(product => {
        result += `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price}</p>
                    <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
    });
    productContainer.innerHTML = result;
}

// Add to Cart
function addToCart() {
    productContainer.addEventListener('click', event => {
        if (event.target.classList.contains('add-to-cart')) {
            const id = parseInt(event.target.dataset.id);
            const product = products.find(item => item.id === id);
            
            // Check if product is already in cart
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            updateCart();
            showCart();
        }
    });
}

// Update Cart
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    let cartContent = '';
    
    if (cart.length === 0) {
        cartContent = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            cartContent += `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-price">$${item.price}</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    cartItemsContainer.innerHTML = cartContent;
    
    // Update cart total
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    // Update checkout items and total
    updateCheckout();
}

// Update Checkout
function updateCheckout() {
    let orderContent = '';
    
    cart.forEach(item => {
        orderContent += `
            <div class="order-item">
                <span class="order-item-name">${item.name} x${item.quantity}</span>
                <span class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    
    orderItemsContainer.innerHTML = orderContent;
    
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    checkoutTotal.textContent = total.toFixed(2);
}

// Cart Functionality
function cartFunctionality() {
    // Show cart
    cartIcon.addEventListener('click', showCart);
    
    // Close cart
    closeCartBtn.addEventListener('click', () => {
        cartOverlay.classList.remove('show');
    });
    
    // Cart item quantity and remove
    cartItemsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('increase')) {
            const id = parseInt(event.target.dataset.id);
            const item = cart.find(item => item.id === id);
            item.quantity += 1;
            updateCart();
        } else if (event.target.classList.contains('decrease')) {
            const id = parseInt(event.target.dataset.id);
            const item = cart.find(item => item.id === id);
            item.quantity -= 1;
            
            if (item.quantity <= 0) {
                cart = cart.filter(item => item.id !== id);
            }
            
            updateCart();
        } else if (event.target.classList.contains('remove-item') || event.target.parentElement.classList.contains('remove-item')) {
            const id = parseInt(event.target.dataset.id || event.target.parentElement.dataset.id);
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            cartOverlay.classList.remove('show');
            checkoutOverlay.classList.add('show');
        }
    });
    
    // Close checkout
    closeCheckoutBtn.addEventListener('click', () => {
        checkoutOverlay.classList.remove('show');
    });
    
    // Place order
    orderForm.addEventListener('submit', event => {
        event.preventDefault();
        
        if (cart.length === 0) return;
        
        const formData = new FormData(orderForm);
        const orderData = {
            customerName: formData.get('customerName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            products: cart,
            totalPrice: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
        };
        
        // Send order to server
        fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Order placed:', data);
            
            // Show confirmation
            checkoutOverlay.classList.remove('show');
            orderConfirmation.classList.add('show');
            
            // Clear cart
            cart = [];
            updateCart();
            
            // Reset form
            orderForm.reset();
        })
        .catch(error => {
            console.error('Error placing order:', error);
            // For demo purposes, still show confirmation even if API call fails
            checkoutOverlay.classList.remove('show');
            orderConfirmation.classList.add('show');
            
            // Clear cart
            cart = [];
            updateCart();
            
            // Reset form
            orderForm.reset();
        });
    });
    
    // Continue shopping
    continueShoppingBtn.addEventListener('click', () => {
        orderConfirmation.classList.remove('show');
    });
}

// Show Cart
function showCart() {
    cartOverlay.classList.add('show');
}

// Initialize
function init() {
    displayProducts();
    addToCart();
    cartFunctionality();
}

// Run on load
window.addEventListener('DOMContentLoaded', init);