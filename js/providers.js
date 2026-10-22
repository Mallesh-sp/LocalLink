/**
 * LocalLink - Providers Directory JavaScript
 * Dynamic multi-criteria filtering, search, sorting, and rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const grid = document.getElementById('providersListGrid');
  const emptyState = document.getElementById('providersEmptyState');
  const resultsCount = document.getElementById('resultsCount');

  // Filter controls
  const searchInput = document.getElementById('filterSearch');
  const serviceSelect = document.getElementById('filterService');
  const ratingSelect = document.getElementById('filterRating');
  const availabilitySelect = document.getElementById('filterAvailability');
  const priceSelect = document.getElementById('filterPrice');
  const sortBySelect = document.getElementById('sortBy');

  const btnResetFilters = document.getElementById('btnResetFilters');
  const btnResetEmptyFilters = document.getElementById('btnResetEmptyFilters');

  // 1. Populate Service Category Select Options
  if (serviceSelect) {
    SERVICE_CATEGORIES.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.name;
      option.textContent = cat.name;
      serviceSelect.appendChild(option);
    });
  }

  // 2. Parse URL parameters (e.g. ?service=Electrician or ?search=AC)
  const urlParams = new URLSearchParams(window.location.search);
  const paramService = urlParams.get('service');
  const paramSearch = urlParams.get('search');

  if (paramService && serviceSelect) {
    serviceSelect.value = paramService;
  }
  if (paramSearch && searchInput) {
    searchInput.value = paramSearch;
  }

  // 3. Filter & Sort Core Function
  function filterAndRenderProviders() {
    if (!grid) return;

    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedService = serviceSelect ? serviceSelect.value : 'all';
    const minRating = ratingSelect ? parseFloat(ratingSelect.value) : 0;
    const selectedAvailability = availabilitySelect ? availabilitySelect.value : 'all';
    const maxPrice = priceSelect && priceSelect.value !== 'all' ? parseFloat(priceSelect.value) : Infinity;
    const sortCriterion = sortBySelect ? sortBySelect.value : 'recommended';

    // Filter array
    let result = PROVIDERS_DATA.filter(p => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        p.name.toLowerCase().includes(searchTerm) || 
        p.service.toLowerCase().includes(searchTerm) || 
        p.about.toLowerCase().includes(searchTerm);

      // Service filter
      const matchesService = selectedService === 'all' || p.service === selectedService;

      // Rating filter
      const matchesRating = p.rating >= minRating;

      // Availability filter
      const matchesAvailability = selectedAvailability === 'all' || p.availability === selectedAvailability;

      // Price filter
      const matchesPrice = p.price <= maxPrice;

      return matchesSearch && matchesService && matchesRating && matchesAvailability && matchesPrice;
    });

    // Sort array
    result.sort((a, b) => {
      if (sortCriterion === 'rating_desc') {
        return b.rating - a.rating;
      } else if (sortCriterion === 'price_asc') {
        return a.price - b.price;
      } else if (sortCriterion === 'experience_desc') {
        return b.experience - a.experience;
      }
      return 0; // recommended default
    });

    // Update Counter text
    if (resultsCount) {
      resultsCount.textContent = `Showing ${result.length} professional${result.length === 1 ? '' : 's'}`;
    }

    // Toggle Grid / Empty State
    if (result.length === 0) {
      grid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
    } else {
      grid.style.display = 'grid';
      if (emptyState) emptyState.style.display = 'none';

      // Render Cards
      grid.innerHTML = result.map(p => `
        <div class="provider-card">
          <div class="provider-header">
            <img src="${p.avatar}" alt="${p.name}" class="provider-avatar">
            <div class="provider-info">
              <h3>${p.name}</h3>
              <span class="provider-service-tag">${p.service}</span>
              ${renderStarRatingHtml(p.rating, p.reviewsCount)}
            </div>
          </div>

          <div class="provider-body">
            <div class="info-item">
              <span class="info-label">Experience</span>
              <span class="info-value">${p.experience} Years</span>
            </div>
            <div class="info-item">
              <span class="info-label">Starting Price</span>
              <span class="info-value">₹${p.price}</span>
            </div>
            <div class="info-item" style="grid-column: span 2;">
              <span class="info-label">Status</span>
              <span class="badge badge-success">${p.availability}</span>
            </div>
          </div>

          <div class="provider-footer">
            <a href="provider-details.html?id=${p.id}" class="btn btn-secondary btn-sm">View Profile</a>
            <a href="booking.html?providerId=${p.id}" class="btn btn-primary btn-sm">Book Now</a>
          </div>
        </div>
      `).join('');
    }
  }

  // 4. Attach Event Listeners
  [searchInput, serviceSelect, ratingSelect, availabilitySelect, priceSelect, sortBySelect].forEach(el => {
    if (el) {
      el.addEventListener('change', filterAndRenderProviders);
      if (el.tagName === 'INPUT') {
        el.addEventListener('input', filterAndRenderProviders);
      }
    }
  });

  // Reset Filters Function
  function resetAllFilters() {
    if (searchInput) searchInput.value = '';
    if (serviceSelect) serviceSelect.value = 'all';
    if (ratingSelect) ratingSelect.value = '0';
    if (availabilitySelect) availabilitySelect.value = 'all';
    if (priceSelect) priceSelect.value = 'all';
    if (sortBySelect) sortBySelect.value = 'recommended';
    filterAndRenderProviders();
  }

  if (btnResetFilters) btnResetFilters.addEventListener('click', resetAllFilters);
  if (btnResetEmptyFilters) btnResetEmptyFilters.addEventListener('click', resetAllFilters);

  // 5. Initial Execution
  filterAndRenderProviders();
});
