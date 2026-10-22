/**
 * LocalLink - Main Utility & Application Framework
 * Handles navbar initialization, mobile menu, search redirects,
 * localStorage helpers, toast notifications, and global helpers.
 */

// Storage Keys
const STORAGE_KEYS = {
  BOOKINGS: 'locallink_bookings',
  REVIEWS: 'locallink_reviews'
};

// Initialize LocalStorage with seed data if empty
function initLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    // Start with empty bookings array so users see clean empty state until they book
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(SEED_REVIEWS));
  }
}

// Get Bookings from storage
function getBookings() {
  const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  return data ? JSON.parse(data) : [];
}

// Save Bookings to storage
function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
}

// Get Reviews from storage
function getReviews() {
  const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
  return data ? JSON.parse(data) : [];
}

// Save Reviews to storage
function saveReviews(reviews) {
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
}

// Generate unique Booking ID (e.g. LL20261084)
function generateBookingId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `LL2026${randomNum}`;
}

// Render Star Rating SVG HTML
function renderStarRatingHtml(rating, reviewsCount = null) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.4;
  let starsHtml = '';

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += SVG_ICONS.star;
    } else if (i === fullStars && hasHalf) {
      starsHtml += SVG_ICONS.star; // filled star
    } else {
      starsHtml += `<svg class="star-icon" style="fill: #cbd5e1; color: #cbd5e1;" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    }
  }

  return `
    <div class="provider-rating">
      ${starsHtml}
      <span class="rating-score">${rating.toFixed(1)}</span>
      ${reviewsCount !== null ? `<span class="review-count">(${reviewsCount} Reviews)</span>` : ''}
    </div>
  `;
}

// Show Toast Message
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Setup Header Navigation & Active State
function setupNavigation() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile Hamburger Menu Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('show');
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('show');
      }
    });
  }
}

// Global Hero Search Handler
function handleGlobalSearch(event) {
  if (event) event.preventDefault();
  const searchInput = document.getElementById('globalSearchInput');
  if (!searchInput) return;

  const query = searchInput.value.trim();
  if (query) {
    window.location.href = `providers.html?search=${encodeURIComponent(query)}`;
  } else {
    window.location.href = `providers.html`;
  }
}

// Quick Pill Click Handler
function filterByPill(serviceName) {
  window.location.href = `providers.html?service=${encodeURIComponent(serviceName)}`;
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initLocalStorage();
  setupNavigation();
});
