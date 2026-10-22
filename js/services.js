/**
 * LocalLink - Services Page JavaScript
 * Handles dynamic rendering & live client-side searching of service categories.
 */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('allServicesGrid');
  const searchInput = document.getElementById('servicesSearchInput');
  const emptyState = document.getElementById('servicesEmptyState');
  const resetBtn = document.getElementById('btnResetServicesSearch');

  // Check URL query param if user arrived with ?search=...
  const urlParams = new URLSearchParams(window.location.search);
  const initialSearch = urlParams.get('search') || '';

  if (initialSearch && searchInput) {
    searchInput.value = initialSearch;
  }

  // Render Service Cards Function
  function renderServices(query = '') {
    if (!grid) return;

    const normalizedQuery = query.toLowerCase().trim();
    
    // Filter Categories array using JS filter method
    const filteredCategories = SERVICE_CATEGORIES.filter(cat => {
      return cat.name.toLowerCase().includes(normalizedQuery) ||
             cat.shortDesc.toLowerCase().includes(normalizedQuery);
    });

    if (filteredCategories.length === 0) {
      grid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
    } else {
      grid.style.display = 'grid';
      if (emptyState) emptyState.style.display = 'none';

      grid.innerHTML = filteredCategories.map(cat => `
        <div class="service-card">
          <div class="service-icon-wrap">
            ${SVG_ICONS[cat.iconKey] || SVG_ICONS.electrician}
          </div>
          <h3>${cat.name}</h3>
          <p>${cat.shortDesc}</p>
          <div class="service-meta">
            <span class="service-price">Starts at <strong>₹${cat.startingPrice}</strong></span>
            <a href="providers.html?service=${encodeURIComponent(cat.name)}" class="btn btn-sm btn-primary">
              View Professionals &rarr;
            </a>
          </div>
        </div>
      `).join('');
    }
  }

  // Live Input Event Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderServices(e.target.value);
    });
  }

  // Reset Search Button Listener
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      renderServices('');
    });
  }

  // Initial Render
  renderServices(initialSearch);
});
