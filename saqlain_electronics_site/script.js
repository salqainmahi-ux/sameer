let cart = [];
let total = 0;

// Load products from local storage or default
let products = JSON.parse(localStorage.getItem("products")) || [
  { name: "Laptop", price: 55000, category: "Laptop", image: "https://via.placeholder.com/200" },
  { name: "Mobile", price: 30000, category: "Mobile", image: "https://via.placeholder.com/200" },
  { name: "Headphones", price: 2500, category: "Accessory", image: "https://via.placeholder.com/200" }
];

function renderProducts(category = null) {
  let container = document.getElementById("product-list");
  if (!container) return; // skip if admin page
  container.innerHTML = "";
  products
    .filter(p => !category || p.category.toLowerCase() === category.toLowerCase())
    .forEach(p => {
      container.innerHTML += `
        <div class="card">
          <img src="${p.image}" alt="${p.name}">
          <h2>${p.name}</h2>
          <p class="price">Rs ${p.price}</p>
          <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
        </div>`;
    });
}
renderProducts();

function addToCart(product, price) {
  cart.push({ product, price });
  total += price;
  updateCartDisplay();
  alert(`✅ ${product} added to cart!`);
}

function toggleCart() {
  let cartDetails = document.getElementById('cart-details');
  cartDetails.style.display = cartDetails.style.display === "block" ? "none" : "block";
}

function updateCartDisplay() {
  let cartItems = document.getElementById('cart-items');
  if (!cartItems) return;
  cartItems.innerHTML = "";
  cart.forEach(item => {
    let li = document.createElement('li');
    li.textContent = `${item.product} - Rs ${item.price}`;
    cartItems.appendChild(li);
  });
  document.getElementById('total').textContent = total;
}

function checkout() {
  if (cart.length === 0) {
    alert("🛒 Your cart is empty!");
  } else {
    alert(`🎉 Order placed successfully! Total: Rs ${total}`);
    cart = [];
    total = 0;
    updateCartDisplay();
    toggleCart();
  }
}

// Admin add product
function addProduct() {
  let name = document.getElementById("product-name").value;
  let price = document.getElementById("product-price").value;
  let category = document.getElementById("product-category").value;
  let image = document.getElementById("product-image").value;

  if (!name || !price || !category || !image) {
    document.getElementById("admin-message").textContent = "❌ Please fill all fields.";
    return;
  }

  products.push({ name, price: parseInt(price), category, image });
  localStorage.setItem("products", JSON.stringify(products));
  document.getElementById("admin-message").textContent = `✅ ${name} added successfully!`;
  document.getElementById("product-name").value = "";
  document.getElementById("product-price").value = "";
  document.getElementById("product-category").value = "";
  document.getElementById("product-image").value = "";
}

// Filter by category
function filterCategory(category) {
  renderProducts(category);
}
