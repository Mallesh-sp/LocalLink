/**
 * LocalLink - Provider Details JavaScript
 * Reads URL query param ?id=X, parses provider object and localStorage reviews,
 * renders full profile card, services offered, working hours, and review list.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('providerDetailsContainer');
  if (!container) return;

  // 1. Get Provider ID from URL Query Parameter
  const urlParams = new URLSearchParams(window.location.search);
  const providerId = parseInt(urlParams.get('id'), 10);

  // 2. Find matching provider in master data
  const provider = PROVIDERS_DATA.find(p => p.id === providerId);

  // Fallback if ID is invalid or missing
  if (!provider) {
    container.innerHTML = `
      <div class="empty-state" style="margin: 3rem 0;">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <h3>Provider Profile Not Found</h3>
        <p>The service professional you are looking for does not exist or has been relocated.</p>
        <a href="providers.html" class="btn btn-primary">Browse All Professionals</a>
      </div>
    `;
    return;
  }

  // Update Page Document Title
  document.title = `${provider.name} (${provider.service}) – LocalLink`;

  // Combine default reviews with custom localStorage reviews for this provider
  const storedReviews = getReviews().filter(r => r.providerName === provider.name || parseInt(r.providerId, 10) === provider.id);
  const allReviews = [...(provider.reviews || []), ...storedReviews];

  // Render Full Profile HTML
  container.innerHTML = `
    <!-- Top Back Navigation Link -->
    <a href="providers.html?service=${encodeURIComponent(provider.service)}" class="back-nav-link">
      &larr; Back to ${provider.service} Professionals
    </a>

    <!-- Top Profile Header Card -->
    <div class="profile-banner-card">
      <img src="${provider.avatar}" alt="${provider.name}" class="profile-main-avatar">
      <div class="profile-main-info">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h1>${provider.name}</h1>
            <div class="profile-service-title">${provider.service} Specialist</div>
            ${renderStarRatingHtml(provider.rating, allReviews.length || provider.reviewsCount)}
          </div>
          <a href="booking.html?providerId=${provider.id}" class="btn btn-primary btn-lg" id="btnBookFromProfile">
            Book This Professional
          </a>
        </div>

        <div class="profile-meta-grid">
          <div class="profile-meta-item">
            <span class="info-label">Experience</span>
            <span class="info-value">${provider.experience} Years</span>
          </div>
          <div class="profile-meta-item">
            <span class="info-label">Starting Rate</span>
            <span class="info-value">₹${provider.price}</span>
          </div>
          <div class="profile-meta-item">
            <span class="info-label">Availability</span>
            <span class="badge badge-success" style="width: fit-content;">${provider.availability}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="filter-layout" style="grid-template-columns: 2fr 1fr; align-items: start;">
      
      <!-- Main Column -->
      <div>
        <!-- About Section -->
        <div class="details-section-card">
          <h3>About ${provider.name}</h3>
          <p style="color: var(--text-main); line-height: 1.7; font-size: 1rem;">
            ${provider.about}
          </p>
        </div>

        <!-- Services Offered -->
        <div class="details-section-card">
          <h3>Services Offered</h3>
          <div class="services-offered-list">
            ${(provider.servicesOffered || []).map(item => `
              <div class="service-offered-item">
                ${SVG_ICONS.check}
                <span>${item}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Reviews & Ratings Section -->
        <div class="details-section-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.5rem;">
            <h3 style="border: none; padding: 0; margin: 0;">Customer Reviews (${allReviews.length})</h3>
            <a href="reviews.html" class="btn btn-sm btn-outline">Write a Review</a>
          </div>

          ${allReviews.length === 0 ? `
            <p style="color: var(--text-muted);">No reviews submitted yet for this professional.</p>
          ` : allReviews.map(rev => `
            <div class="review-item">
              <div class="review-item-header">
                <strong style="color: var(--text-dark);">${rev.customerName || rev.name}</strong>
                <span style="font-size: 0.85rem; color: var(--text-muted);">${rev.date}</span>
              </div>
              <div style="margin-bottom: 0.4rem;">
                ${renderStarRatingHtml(rev.rating)}
              </div>
              <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">
                "${rev.comment}"
              </p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Sidebar Column -->
      <div>
        <!-- Service Areas -->
        <div class="details-section-card">
          <h3>Service Areas</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            Primary doorstep service locations:
          </p>
          <div>
            ${(provider.serviceAreas || []).map(area => `
              <span class="area-tag">${area}</span>
            `).join('')}
          </div>
        </div>

        <!-- Working Hours -->
        <div class="details-section-card">
          <h3>Working Hours</h3>
          <div style="display: flex; gap: 0.75rem; align-items: flex-start; font-size: 0.95rem; color: var(--text-dark);">
            <svg style="width: 20px; height: 20px; color: var(--primary); flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <div>
              <strong>${provider.workingHours}</strong>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">Available for doorstep visits.</div>
            </div>
          </div>
        </div>

        <!-- Quick Booking CTA Card -->
        <div class="details-section-card" style="background-color: var(--primary-light); border-color: #bfdbfe;">
          <h3 style="color: var(--primary-dark); border-bottom-color: #93c5fd;">Ready to book?</h3>
          <p style="font-size: 0.9rem; color: var(--text-dark); margin-bottom: 1.25rem;">
            Select your preferred date and time slot with zero upfront payment needed.
          </p>
          <a href="booking.html?providerId=${provider.id}" class="btn btn-primary btn-block">
            Book ${provider.name.split(' ')[0]} Now
          </a>
        </div>
      </div>

    </div>
  `;
});
