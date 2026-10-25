'use strict';

// VELOURA demo storefront.
// All products and prices are sample data.
const PRODUCTS = [
  {id:1,name:'Hydrating Dew Serum',brand:'VELORA SKIN',category:'Skincare',price:699,oldPrice:899,rating:4.8,tag:'BESTSELLER',image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80'},
  {id:2,name:'Daily Glow Moisturiser',brand:'VELORA SKIN',category:'Skincare',price:549,oldPrice:699,rating:4.7,tag:'',image:'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=80'},
  {id:3,name:'Velvet Matte Lipstick',brand:'STUDIO V',category:'Makeup',price:399,oldPrice:499,rating:4.6,tag:'POPULAR',image:'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=80'},
  {id:4,name:'Everyday Blush Palette',brand:'STUDIO V',category:'Makeup',price:799,oldPrice:999,rating:4.5,tag:'',image:'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=700&q=80'},
  {id:5,name:'Nourish Hair Oil',brand:'ROOT & RITUAL',category:'Haircare',price:449,oldPrice:599,rating:4.7,tag:'',image:'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80'},
  {id:6,name:'Smooth & Shine Shampoo',brand:'ROOT & RITUAL',category:'Haircare',price:499,oldPrice:599,rating:4.4,tag:'',image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80'},
  {id:7,name:'Amber Bloom Eau de Parfum',brand:'MAISON V',category:'Fragrance',price:1299,oldPrice:1599,rating:4.8,tag:'BESTSELLER',image:'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80'},
  {id:8,name:'Soft Musk Perfume Mist',brand:'MAISON V',category:'Fragrance',price:599,oldPrice:749,rating:4.3,tag:'',image:'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80'},
  {id:9,name:'Silk Body Lotion',brand:'SUNDAY BODY',category:'Bodycare',price:349,oldPrice:449,rating:4.6,tag:'',image:'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=80'},
  {id:10,name:'Gentle Body Polish',brand:'SUNDAY BODY',category:'Bodycare',price:429,oldPrice:549,rating:4.5,tag:'',image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80'},
  {id:11,name:'Vitamin C Face Cleanser',brand:'VELORA SKIN',category:'Skincare',price:379,oldPrice:499,rating:4.4,tag:'',image:'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80'},
  {id:12,name:'Everyday Kajal Pencil',brand:'STUDIO V',category:'Makeup',price:249,oldPrice:299,rating:4.5,tag:'VALUE PICK',image:'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80'}
];

const STORAGE_KEY = 'veloura-demo-cart-v1';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const formatPrice = amount =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);

let activeCategory = 'All';
let cart = loadCart();
let toastTimer;

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    if (!Array.isArray(saved)) return [];

    return saved
      .filter(item =>
        PRODUCTS.some(product => product.id === Number(item.id)) &&
        Number(item.qty) > 0
      )
      .map(item => ({
        id: Number(item.id),
        qty: Math.min(99, Math.max(1, Math.floor(Number(item.qty) || 1)))
      }));
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // The cart can still work for the current page if storage is unavailable.
  }
}

function getProduct(id) {
  return PRODUCTS.find(product => product.id === Number(id));
}

function cartQuantity() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return cart.reduce((sum, item) => {
    return sum + (getProduct(item.id)?.price || 0) * item.qty;
  }, 0);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function renderProducts() {
  const grid = $('#productGrid');
  if (!grid) return;

  const query = ($('#searchInput')?.value || '').trim().toLowerCase();

  let products = PRODUCTS.filter(product => {
    const matchesCategory =
      activeCategory === 'All' || product.category === activeCategory;

    const searchableText =
      `${product.name} ${product.brand} ${product.category}`.toLowerCase();

    return matchesCategory && searchableText.includes(query);
  });

  const sort = $('#sortSelect')?.value || 'featured';

  if (sort === 'price-low') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    products.sort((a, b) => b.rating - a.rating);
  }

  grid.innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-photo">
        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/600x720/f4f0ed/333?text=VELOURA'"
        >
        ${product.tag
          ? `<span class="sale-tag">${escapeHTML(product.tag)}</span>`
          : ''}
        <button
          class="quick-add"
          type="button"
          data-add="${product.id}"
        >＋ ADD TO BAG</button>
      </div>

      <div class="product-info">
        <p class="product-brand">${escapeHTML(product.brand)}</p>
        <h3 class="product-name">${escapeHTML(product.name)}</h3>
        <div class="rating">
          ★ ${product.rating.toFixed(1)}
          <span>(${Math.round(product.rating * 17)} reviews)</span>
        </div>
        <div class="price">
          ${formatPrice(product.price)}
          <del>${formatPrice(product.oldPrice)}</del>
        </div>
      </div>
    </article>
  `).join('');

  $('#resultsCount').textContent =
    `${products.length} product${products.length === 1 ? '' : 's'} shown`;

  $('#emptyState').hidden = products.length !== 0;
  grid.hidden = products.length === 0;
}

function addToCart(id) {
  const product = getProduct(id);
  if (!product) return;

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty = Math.min(99, existing.qty + 1);
  } else {
    cart.push({ id: product.id, qty: 1 });
  }

  saveCart();
  renderCart();
  showToast(`${product.name} added to your bag`);
}

function changeQuantity(id, delta) {
  const item = cart.find(entry => entry.id === Number(id));
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    cart = cart.filter(entry => entry.id !== Number(id));
  }

  if (item.qty > 99) {
    item.qty = 99;
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== Number(id));
  saveCart();
  renderCart();
  showToast('Item removed from your bag');
}

function renderCart() {
  $('#cartCount').textContent = cartQuantity();
  $('#drawerCount').textContent = `(${cartQuantity()})`;
  $('#cartSubtotal').textContent = formatPrice(cartTotal());
  $('#checkoutTotal').textContent = formatPrice(cartTotal());

  const items = $('#cartItems');

  if (!cart.length) {
    items.innerHTML = `
      <div class="cart-empty">
        <p>Your bag is waiting for a little something.</p>
        <button class="btn btn-dark" type="button" id="emptyBagShop">
          EXPLORE PRODUCTS
        </button>
      </div>
    `;
    return;
  }

  items.innerHTML = cart.map(item => {
    const product = getProduct(item.id);
    if (!product) return '';

    return `
      <article class="cart-item">
        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          onerror="this.onerror=null;this.src='https://placehold.co/160x180/f4f0ed/333?text=VELOURA'"
        >

        <div>
          <h3>${escapeHTML(product.name)}</h3>
          <small>${formatPrice(product.price)} each</small>

          <div class="cart-item-controls">
            <div class="qty-control">
              <button
                type="button"
                data-qty="${product.id}"
                data-delta="-1"
                aria-label="Decrease quantity"
              >−</button>

              <span>${item.qty}</span>

              <button
                type="button"
                data-qty="${product.id}"
                data-delta="1"
                aria-label="Increase quantity"
              >+</button>
            </div>

            <button
              type="button"
              class="remove-btn"
              data-remove="${product.id}"
            >Remove</button>
          </div>
        </div>

        <strong class="cart-item-price">
          ${formatPrice(product.price * item.qty)}
        </strong>
      </article>
    `;
  }).join('');
}

function openCart() {
  $('#overlay').hidden = false;
  $('#cartDrawer').classList.add('open');
  $('#cartDrawer').setAttribute('aria-hidden', 'false');
  document.body.classList.add('locked');
  $('#closeCart').focus();
}

function closeCart() {
  $('#cartDrawer').classList.remove('open');
  $('#cartDrawer').setAttribute('aria-hidden', 'true');
  $('#overlay').hidden = true;
  document.body.classList.remove('locked');
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

function setCategory(category) {
  activeCategory = category;

  $$('[data-filter]').forEach(button => {
    button.classList.toggle('active', button.dataset.filter === category);
  });

  renderProducts();
}

function openCheckout() {
  if (!cart.length) {
    showToast('Your bag is empty');
    return;
  }

  closeCart();

  $('#checkoutForm').hidden = false;
  $('#orderSuccess').hidden = true;
  $('#checkoutTotal').textContent = formatPrice(cartTotal());

  const modal = $('#checkoutModal');

  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    showToast('Please use a modern browser to open checkout');
  }
}

// Handle product, category and cart buttons.
document.addEventListener('click', event => {
  const target = event.target;

  if (!(target instanceof Element)) return;

  const addButton = target.closest('[data-add]');
  if (addButton) {
    addToCart(addButton.dataset.add);
    return;
  }

  const quantityButton = target.closest('[data-qty]');
  if (quantityButton) {
    changeQuantity(
      quantityButton.dataset.qty,
      Number(quantityButton.dataset.delta)
    );
    return;
  }

  const removeButton = target.closest('[data-remove]');
  if (removeButton) {
    removeFromCart(removeButton.dataset.remove);
    return;
  }

  const categoryButton = target.closest('[data-category]');
  if (categoryButton) {
    setCategory(categoryButton.dataset.category);
    $('#shop').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const filterButton = target.closest('[data-filter]');
  if (filterButton) {
    setCategory(filterButton.dataset.filter);
    return;
  }

  if (target.closest('#emptyBagShop')) {
    closeCart();
    $('#shop').scrollIntoView({ behavior: 'smooth' });
    return;
  }
});

// Search and sorting.
$('#searchInput').addEventListener('input', renderProducts);
$('#sortSelect').addEventListener('change', renderProducts);

$('#searchToggle').addEventListener('click', () => {
  $('#shop').scrollIntoView({ behavior: 'smooth' });

  setTimeout(() => {
    $('#searchInput').focus();
  }, 350);
});

$('#clearFilters').addEventListener('click', () => {
  $('#searchInput').value = '';
  $('#sortSelect').value = 'featured';
  setCategory('All');
});

// Shopping bag controls.
$('#cartToggle').addEventListener('click', openCart);
$('#closeCart').addEventListener('click', closeCart);
$('#continueShopping').addEventListener('click', closeCart);
$('#overlay').addEventListener('click', closeCart);
$('#checkoutButton').addEventListener('click', openCheckout);

// Demo checkout controls.
$('#closeCheckout').addEventListener('click', () => {
  $('#checkoutModal').close();
});

$('#finishOrder').addEventListener('click', () => {
  $('#checkoutModal').close();
  cart = [];
  saveCart();
  renderCart();
  showToast('Demo preview complete');
});

// Mobile navigation.
$('#menuToggle').addEventListener('click', () => {
  const nav = $('#mainNav');
  const isOpen = nav.classList.toggle('open');

  $('#menuToggle').setAttribute('aria-expanded', String(isOpen));
});

$$('#mainNav a').forEach(link => {
  link.addEventListener('click', () => {
    $('#mainNav').classList.remove('open');
    $('#menuToggle').setAttribute('aria-expanded', 'false');
  });
});

// Newsletter preview only; no email is collected or sent.
$('#newsletterForm').addEventListener('submit', event => {
  event.preventDefault();

  $('#newsletterMessage').textContent =
    'Thanks! This demo does not save or send email addresses.';

  $('#newsletterForm').reset();
});

// Demo checkout: this does not create a real order.
$('#checkoutForm').addEventListener('submit', event => {
  event.preventDefault();

  if (!cart.length) {
    showToast('Your bag is empty');
    $('#checkoutModal').close();
    return;
  }

  const formData = new FormData(event.currentTarget);
  const customerName = String(formData.get('name') || 'there').trim();

  $('#orderMessage').textContent =
    `Thank you, ${customerName}. Your sample basket total is ${formatPrice(cartTotal())}. This is only a visual demo; no order has been submitted.`;

  $('#checkoutForm').hidden = true;
  $('#orderSuccess').hidden = false;
});

// Set the current year and initialise the page.
$('#year').textContent = new Date().getFullYear();

renderProducts();
renderCart();
