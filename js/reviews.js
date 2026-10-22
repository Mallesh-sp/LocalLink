/**
 * LocalLink - Interactive Reviews & Rating System JavaScript
 * Handles star selector UI, review submission, validation,
 * localStorage persistence, and dynamic review stream rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reviewForm');
  const starPicker = document.getElementById('starPicker');
  const communityList = document.getElementById('communityReviewsList');

  let selectedRating = 0;

  // 1. Interactive Star Rating Selector Logic
  if (starPicker) {
    const stars = starPicker.querySelectorAll('span');

    stars.forEach((star, index) => {
      // Hover effect
      star.addEventListener('mouseover', () => {
        stars.forEach((s, idx) => {
          if (idx <= index) {
            s.style.color = 'var(--accent)';
          } else {
            s.style.color = '#cbd5e1';
          }
        });
      });

      // Mouseout effect restores current selected state
      star.addEventListener('mouseout', () => {
        stars.forEach((s, idx) => {
          if (idx < selectedRating) {
            s.style.color = 'var(--accent)';
          } else {
            s.style.color = '#cbd5e1';
          }
        });
      });

      // Click event sets selected rating
      star.addEventListener('click', () => {
        selectedRating = index + 1;
        stars.forEach((s, idx) => {
          if (idx < selectedRating) {
            s.classList.add('active');
            s.style.color = 'var(--accent)';
          } else {
            s.classList.remove('active');
            s.style.color = '#cbd5e1';
          }
        });
        document.getElementById('errStarRating').classList.remove('visible');
      });
    });
  }

  // 2. Parse URL parameters (?bookingId=LL2026xxxx)
  const urlParams = new URLSearchParams(window.location.search);
  const paramBookingId = urlParams.get('bookingId');
  const bookingInput = document.getElementById('reviewBookingId');
  const nameInput = document.getElementById('reviewCustomerName');

  if (paramBookingId && bookingInput) {
    bookingInput.value = paramBookingId;

    // Check if booking exists in localStorage to pre-fill customer name
    const foundBooking = getBookings().find(b => b.id === paramBookingId);
    if (foundBooking && nameInput) {
      nameInput.value = foundBooking.customerName;
    }
  }

  // Auto-fill reviewer name if logged in
  const currentUser = getCurrentUser();
  if (currentUser && nameInput && !nameInput.value) {
    nameInput.value = currentUser.name;
  }

  // 3. Render Community Reviews
  function renderCommunityReviews() {
    if (!communityList) return;

    const reviews = getReviews();

    if (reviews.length === 0) {
      communityList.innerHTML = `<p style="color: var(--text-muted);">No reviews submitted yet.</p>`;
      return;
    }

    communityList.innerHTML = reviews.map(r => `
      <div class="review-card" style="background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
          <div>
            <h4 style="font-size: 1.05rem; color: var(--text-dark); margin-bottom: 0.2rem;">${r.customerName}</h4>
            <span class="badge badge-info">${r.bookingId ? `Booking ${r.bookingId}` : 'Verified Customer'}</span>
          </div>
          <span style="font-size: 0.85rem; color: var(--text-muted);">${r.date}</span>
        </div>
        
        <div style="margin-bottom: 0.75rem;">
          ${renderStarRatingHtml(r.rating)}
        </div>

        <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6;">
          "${r.comment}"
        </p>
      </div>
    `).join('');
  }

  // 4. Form Submit Listener
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const bookingId = document.getElementById('reviewBookingId').value.trim();
      const customerName = document.getElementById('reviewCustomerName').value.trim();
      const reviewText = document.getElementById('reviewText').value.trim();

      const errBooking = document.getElementById('errReviewBookingId');
      const errName = document.getElementById('errReviewCustomerName');
      const errRating = document.getElementById('errStarRating');
      const errText = document.getElementById('errReviewText');

      let isValid = true;

      if (!bookingId) {
        errBooking.classList.add('visible');
        isValid = false;
      } else {
        errBooking.classList.remove('visible');
      }

      if (!customerName) {
        errName.classList.add('visible');
        isValid = false;
      } else {
        errName.classList.remove('visible');
      }

      if (selectedRating === 0) {
        errRating.classList.add('visible');
        isValid = false;
      } else {
        errRating.classList.remove('visible');
      }

      if (!reviewText) {
        errText.classList.add('visible');
        isValid = false;
      } else {
        errText.classList.remove('visible');
      }

      if (!isValid) return;

      // Identify provider name if booking ID is found
      let providerName = 'Local Specialist';
      const matchBooking = getBookings().find(b => b.id === bookingId);
      if (matchBooking) {
        providerName = matchBooking.providerName;
      }

      // Create Review Object
      const newReview = {
        id: Date.now(),
        bookingId: bookingId,
        customerName: customerName,
        providerName: providerName,
        rating: selectedRating,
        comment: reviewText,
        date: new Date().toISOString().split('T')[0]
      };

      // Save to localStorage
      const reviews = getReviews();
      reviews.unshift(newReview);
      saveReviews(reviews);

      showToast('Thank you! Your review has been submitted successfully.', 'success');

      // Reset Form & Star Selector
      form.reset();
      selectedRating = 0;
      if (starPicker) {
        starPicker.querySelectorAll('span').forEach(s => {
          s.classList.remove('active');
          s.style.color = '#cbd5e1';
        });
      }

      // Re-render
      renderCommunityReviews();
    });
  }

  // Initial Execution
  renderCommunityReviews();
});
