const WHATSAPP_NUMBER = "233539512172"; // Replace with actual MK GADGETS WhatsApp number

let activeCategory = "All";
const categories = ["All", ...new Set(products.map((p) => p.category))];

const badgeStyles = {
  Hot: { bg: "#fff1f0", color: "#f43f5e" },
  New: { bg: "#eff6ff", color: "#2563eb" },
  Popular: { bg: "#f5f3ff", color: "#7c3aed" },
  "In Stock": { bg: "#f0fdf4", color: "#16a34a" },
  "Best Value": { bg: "#fffbeb", color: "#d97706" },
};

function openWhatsApp(productName, price) {
  const message = encodeURIComponent(
    `Hi MK GADGETS! 👋 I'm interested in the *${productName}* (GH₵ ${price.toLocaleString()}). Is it available?`,
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}

function renderCategories() {
  document.getElementById("category-nav").innerHTML = categories
    .map(
      (cat) => `
    <button class="cat-btn ${cat === activeCategory ? "active" : ""}" onclick="filterCategory('${cat}')">
      ${cat}
    </button>
  `,
    )
    .join("");
}

function renderProducts() {
  const query = document.getElementById("search-input").value.toLowerCase();
  console.log(query);
  const filtered = products.filter(
    (p) =>
      (activeCategory === "All" || p.category === activeCategory) &&
      p.name.toLowerCase().includes(query),
  );

  const countEl = document.getElementById("product-count");
  countEl.textContent = `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`;

  const grid = document.getElementById("product-grid");
  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-state">No products found.</div>`;
    return;
  }

  grid.innerHTML = filtered
    .map((p, i) => {
      const badge = badgeStyles[p.badge] || { bg: "#f3f4f6", color: "#374151" };
      return `
      <div class="product-card" style="animation-delay: ${i * 60}ms">
        <div class="card-top">
          <div class="product-icon-wrap">${p.icon}</div>
          <span class="badge" style="background:${badge.bg};color:${badge.color}">${p.badge}</span>
        </div>
        <div class="category-tag">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.description}</div>
        <div class="specs-list">
          ${p.specs.map((s) => `<span class="spec-tag">${s}</span>`).join("")}
        </div>
        <div class="card-divider"></div>
        <div class="card-footer">
          <div class="price"><small>GH₵ </small>${p.price.toLocaleString()}</div>
          <button class="want-btn" onclick="openWhatsApp('${p.name}', ${p.price})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.534 5.856L.057 23.882a.5.5 0 00.612.612l6.026-1.477A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.697-.506-5.236-1.389l-.374-.218-3.878.951.969-3.768-.236-.386A9.959 9.959 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
            </svg>
            I Want This
          </button>
        </div>
      </div>
    `;
    })
    .join("");
}

function filterCategory(cat) {
  activeCategory = cat;
  renderCategories();
  renderProducts();
}

function startClock() {
  const el = document.getElementById("live-time");
  const tick = () => (el.textContent = new Date().toLocaleTimeString("en-GB"));
  tick();
  setInterval(tick, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("search-input")
    .addEventListener("input", renderProducts);
  renderCategories();
  renderProducts();
  startClock();
});
