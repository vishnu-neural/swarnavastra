/**
 * SILK HOUSE — MVP Homepage JavaScript
 * Handcrafted Silk Saree E-Commerce Brand Prototype
 */

// 1. Temporary Product Catalog (5 Silk Saree Masterpieces)
const products = [
  {
    id: 1,
    name: "Maharani Vermilion Kanchipuram Silk",
    category: "kanchipuram",
    categoryLabel: "Kanchipuram",
    price: 42500,
    weave: "Korvai Pure Zari Border",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    fallbackText: "Kanchipuram Silk"
  },
  {
    id: 2,
    name: "Varanasi Antique Gold Banarasi Brocade",
    category: "banarasi",
    categoryLabel: "Banarasi",
    price: 38900,
    weave: "Pure Katan Silk & Floral Boota",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    fallbackText: "Banarasi Brocade"
  },
  {
    id: 3,
    name: "Swarna Mayil Bridal Heritage Silk",
    category: "bridal",
    categoryLabel: "Bridal",
    price: 68000,
    weave: "Pure Gold Tissue & Peacock Motifs",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    fallbackText: "Bridal Heritage Silk"
  },
  {
    id: 4,
    name: "Emerald Temple Border Kanchipuram Pattu",
    category: "kanchipuram",
    categoryLabel: "Kanchipuram",
    price: 34500,
    weave: "Traditional Temple Korvai Border",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
    fallbackText: "Emerald Kanchipuram"
  },
  {
    id: 5,
    name: "Gulabi Gulab Banarasi Jangla Saree",
    category: "banarasi",
    categoryLabel: "Banarasi",
    price: 29800,
    weave: "All-Over Kadwa Floral Weave",
    image: "https://images.unsplash.com/photo-1583391733975-c546ba642e03?auto=format&fit=crop&w=800&q=80",
    fallbackText: "Banarasi Jangla"
  }
];

// 2. DOM Selectors
const productGrid = document.getElementById("product-grid");
const emptyState = document.getElementById("empty-state");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartCountElem = document.getElementById("cart-count");
const mobileToggle = document.getElementById("mobile-toggle");
const navMenu = document.getElementById("nav-menu");

// State
let cartCount = 0;
let currentFilter = "all";

// 3. Currency Formatter for Indian Rupees (INR)
const formatINR = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
};

// 4. Fallback Placeholder Generator (SVG Data URI)
const getFallbackImage = (title) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4a0e17;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#2a050b;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="600" height="800" fill="url(#grad)" />
    <rect x="25" y="25" width="550" height="750" fill="none" stroke="#d4af37" stroke-width="2" stroke-opacity="0.5" />
    <text x="50%" y="46%" font-family="serif" font-size="28" fill="#e7c96e" text-anchor="middle" font-weight="bold">SILK HOUSE</text>
    <text x="50%" y="52%" font-family="sans-serif" font-size="16" fill="#fdfbf7" text-anchor="middle" letter-spacing="3">${title}</text>
    <text x="50%" y="58%" font-family="serif" font-size="22" fill="#d4af37" text-anchor="middle">✦ ⚜ ✦</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// 5. Render Products based on Active Filter
function renderProducts(category = "all") {
  // Filter products array
  const filteredProducts = category === "all"
    ? products
    : products.filter(product => product.category.toLowerCase() === category.toLowerCase());

  // Handle empty state
  if (filteredProducts.length === 0) {
    productGrid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  // Build HTML for product cards
  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card" data-category="${product.category}">
      <div class="product-image-wrap">
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          class="product-image"
          loading="lazy"
          onerror="this.onerror=null; this.src='${getFallbackImage(product.fallbackText)}';"
        >
        <span class="product-category-tag">${product.categoryLabel}</span>
      </div>
      <div class="product-card-body">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-meta">
          <span>⚜</span> ${product.weave}
        </p>
        <div class="product-price-row">
          <span class="product-price-label">Price</span>
          <span class="product-price-val">${formatINR(product.price)}</span>
        </div>
        <button class="card-action-btn" onclick="addToBag('${product.name.replace(/'/g, "\\'")}')">
          Add to Bag
        </button>
      </div>
    </article>
  `).join("");
}

// 6. Set Active Filter & Update UI
function applyFilter(category) {
  currentFilter = category;

  // Update button active state & aria attributes
  filterButtons.forEach(btn => {
    const isSelected = btn.dataset.filter === category;
    btn.classList.toggle("active", isSelected);
    btn.setAttribute("aria-selected", isSelected ? "true" : "false");
  });

  // Re-render matching products
  renderProducts(category);
}

// 7. Attach Click Listeners to Filter Buttons
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    applyFilter(selectedFilter);
  });
});

// 8. Footer Category Filter Links support
document.querySelectorAll("[data-footer-filter]").forEach(link => {
  link.addEventListener("click", (e) => {
    const filter = link.dataset.footerFilter;
    if (filter) {
      applyFilter(filter);
    }
  });
});

// 9. Simple Toast Feedback for "Add to Bag"
function addToBag(sareeName) {
  cartCount += 1;
  cartCountElem.textContent = cartCount;

  // Remove existing toast if present
  const existingToast = document.querySelector(".toast-notice");
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast notification
  const toast = document.createElement("div");
  toast.className = "toast-notice";
  toast.innerHTML = `
    <span>✦</span>
    <span>Added <strong>${sareeName}</strong> to your bag</span>
  `;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Auto hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// 10. Mobile Menu Toggle
if (mobileToggle && navMenu) {
  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Close mobile menu on clicking any navigation link
  navMenu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}

// 11. Initial Application Load
document.addEventListener("DOMContentLoaded", () => {
  renderProducts("all");
});
